import type { Server } from "bun";
import type { StorageManager } from "../storage/index.ts";
import { printIncomingForProxy } from "../services/base/incoming-print.ts";
import type { ParsedAIUpstream } from "../config/parsers/ai-upstream.ts";
import { prepareProxyReqToUpstream, proxyReqToUpstream } from "../services/base/proxy.ts";
import { RESP_NOT_FOUND, RESP_WIP } from "../services/base/basic-responses.ts";
import type { PluginStateStorage } from "../plugins/types.ts";

/**
 * @see https://platform.openai.com/docs/api-reference/chat/create
 */
export function createV1ChatRoutes(storage: StorageManager) {
  return {
    "/v1/chat/completions": v1ChatCompletions,
  };

  async function v1ChatCompletions(this: Server, req: Request, server: Server): Promise<Response> {
    const ROUTE_NAME = "chat/completions";
    const state: PluginStateStorage = {};

    const prepare = await prepareProxyReqToUpstream(storage, state, req, ROUTE_NAME, {
      allowedMethod: ["POST"],
      shouldBeJSON: true,
    });
    if ("resp" in prepare) return prepare.resp;

    let upstream: ParsedAIUpstream | undefined;
    const { body, method, url } = prepare;
    if (body.modelId) upstream = storage.getUpstreamByModel(body.modelId);
    if (!upstream) {
      upstream = storage.fallbackUpstream;
      if (!upstream) {
        printIncomingForProxy(ROUTE_NAME, method, url, undefined, body.modelId);
        return RESP_NOT_FOUND;
      }
    }

    url.pathname = url.pathname.replace(/^\/v1\//, "/");
    return await proxyReqToUpstream(storage, state, upstream, method, url, req.headers, body, ROUTE_NAME);
  }
}
