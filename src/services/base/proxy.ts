import { Readable, Writable } from "stream";
import { request as requestHTTP } from "http";
import { request as requestHTTPS } from "https";
import { WriteStream, createWriteStream } from "fs";
import { relative } from "path";

import { Tick } from "../../utils/tick.ts";
import type { PluginFirstArg, PluginStateStorage } from "../../plugins/types.ts";
import type { ParsedAIUpstream } from "../../config/parsers/ai-upstream.ts";
import type { StorageManager } from "../../storage/index.ts";
import { isHTTPS } from "../../utils/is-https.ts";
import { callPlugins } from "../call-plugins.ts";
import { parseIncomingBody, type ParsedIncomingBody } from "./incoming-body.ts";
import { printIncomingForProxy } from "./incoming.ts";
import { updateHeadersToUpstream } from "./upstream-headers.ts";
import { parseContentType } from "../../utils/http-headers.ts";
import { COLORS_ALL } from "../../utils/colors/index.ts";
import { getErrorMessage } from "../../utils/error.ts";
import { RESP_INTERNAL_ERROR, RESP_NOT_FOUND } from "./basic-responses.ts";
import { formatSize } from "../../utils/format-size.ts";
import { resolveUpstreamURL } from "./upstream-url.ts";
import { createDecoderForContentEncoding } from "../../utils/content-encoding.ts";

export async function prepareProxyReqToUpstream(req: Request): Promise<
  | {
      resp: Response;
    }
  | {
      url: URL;
      method: Uppercase<string>;
      body: ParsedIncomingBody;
    }
> {
  let url: URL;
  const method = req.method.toUpperCase() as Uppercase<string>;

  try {
    url = new URL(req.url);
  } catch (error) {
    printIncomingForProxy("fallback", method, req.url, "Invalid URL");
    return { resp: RESP_NOT_FOUND };
  }
  const contentType = parseContentType(req.headers);

  let body: ParsedIncomingBody;
  try {
    body = await parseIncomingBody(req, method, contentType);
  } catch (error) {
    printIncomingForProxy("fallback", method, url, getErrorMessage(error));
    return { resp: RESP_INTERNAL_ERROR };
  }
  return { url, method, body };
}

export async function proxyReqToUpstream(
  storage: StorageManager,
  upstream: ParsedAIUpstream,
  method: Uppercase<string>,
  incomingURL: URL,
  incomingHeaders: Headers,
  body: ParsedIncomingBody
) {
  const writeLogs = !!storage.config.dump_request_logs;
  const state: PluginStateStorage = {};
  const upstreamURL = resolveUpstreamURL(upstream.endpoint, incomingURL.pathname);
  upstreamURL.search = incomingURL.search;

  const headers = new Headers(incomingHeaders);
  headers.set("Host", upstreamURL.host);
  updateHeadersToUpstream(headers, upstream, true);
  await callPlugins(storage.plugins, "transformHeaders", { method, target: upstreamURL, headers, state });

  let writeResp: string | undefined;
  if (writeLogs) {
    const target = storage.writeLogs("messages", body, false);
    if (target?.filePath) writeResp = target.filePath.replace(/\.([\w-]+)$/, "-resp.$1");
  }

  if (body.json) {
    const args: PluginFirstArg<"transformJsonBody"> = {
      method,
      target: upstreamURL,
      body: body.json,
      state,
    };
    await callPlugins(storage.plugins, "transformJsonBody", args);
    body.json = args.body;
  }

  const httpProxy = storage.proxyAgents.get(upstream);
  printIncomingForProxy(
    "fallback",
    method,
    incomingURL,
    undefined,
    body.modelId,
    upstream,
    httpProxy?.url,
    upstreamURL
  );
  console.log(`-> ${upstreamURL.toString()}`);

  return new Promise<Response>((resolve, reject) => {
    const { tick } = new Tick();
    const request = isHTTPS(upstream.endpoint) ? requestHTTPS : requestHTTP;
    const upstreamReq = request(
      upstreamURL,
      {
        method,
        headers: headers.toJSON(),
        agent: httpProxy.agent,
      },
      (upstreamRes) => {
        let debugStream: Writable | undefined;
        let closeDebugStream: WriteStream | undefined;
        const encoding = upstreamRes.headers["content-encoding"];
        if (writeResp) {
          closeDebugStream = createWriteStream(writeResp, { autoClose: true });
          debugStream = closeDebugStream;
          const prefix: string[] = [upstreamRes.url || ""];
          for (const [key, value] of Object.entries(upstreamRes.headers)) prefix.push(`${key}: ${value}`);
          debugStream.write(`${prefix.join("\n")}\n\n`);

          const decoder = createDecoderForContentEncoding(encoding);
          if (decoder) {
            decoder.transform.pipe(debugStream);
            debugStream = decoder.transform;
          }
          // if(encoding)
        }

        const contentType = parseContentType(upstreamRes.headers["content-type"]);
        let log = `<- ${upstreamRes.statusCode}`;
        if (contentType.raw) log += ` "${contentType.raw}"`;
        if (encoding) log += ` ${COLORS_ALL.BROWN}"${encoding}"${COLORS_ALL.RESET}`;
        log += ` ${COLORS_ALL.DIM}+${tick().str}${COLORS_ALL.RESET}`;
        console.log(log);

        let totalSizes = 0;
        let totlaChunks = 0;
        let controller: Bun.ReadableStreamController<any> | undefined;
        const stream = new ReadableStream({
          start(_controller) {
            controller = _controller;
          },
        });
        const onData = (chunk: Buffer) => {
          if (debugStream) debugStream.write(chunk);
          // process.stderr.write(chunk.toString("utf-8"));
          controller?.enqueue(chunk);
          totalSizes += chunk.length;
          totlaChunks++;
        };

        upstreamRes.on("data", onData);
        upstreamRes.once("end", () => {
          let log = `<- ${formatSize(totalSizes, false)}`;
          if (totlaChunks > 1) log += ` (${totlaChunks} chunks)`;
          log += `${COLORS_ALL.DIM}+${tick().str}${COLORS_ALL.RESET}`;
          console.log(log);

          upstreamRes.off("data", onData);
          controller?.close();
          if (closeDebugStream) {
            closeDebugStream.close();
            const relPath = relative(process.cwd(), writeResp!);
            console.log(`${COLORS_ALL.DIM}dump to "${relPath}"${COLORS_ALL.RESET}`);
          }
        });

        const res = new Response(stream, {
          status: upstreamRes.statusCode,
          headers: upstreamRes.headers as any,
        });
        return resolve(res);
      }
    );
    upstreamReq.once("error", (error) => {
      const log = `<- ${COLORS_ALL.RED}Error: ${getErrorMessage(error)}${COLORS_ALL.RESET}`;
      console.log(log);
      reject(error);
    });

    if (body.original) {
      if (body.json) {
        upstreamReq.write(JSON.stringify(body.json));
        upstreamReq.end();
      } else if (body.raw) {
        upstreamReq.write(body.raw);
        upstreamReq.end();
      } else Readable.from(body.original).pipe(upstreamReq);
    } else {
      upstreamReq.end();
    }
  });
}
