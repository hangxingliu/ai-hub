import type { Server } from "bun";
import type { StorageManager } from "../storage/index.js";
import { printIncomingForProxy } from "../services/base/incoming-print.js";
import type { ParsedAIUpstream } from "../config/parsers/ai-upstream.js";
import { prepareProxyReqToUpstream, proxyReqToUpstream } from "../services/base/proxy.js";
import { RESP_NOT_FOUND } from "../services/base/basic-responses.js";
import type { PluginStateStorage } from "../plugins/types.js";

/**
 * @see https://platform.openai.com/docs/api-reference/audio/createSpeech
 */
export function createV1AudioRoutes(storage: StorageManager) {
  return {
    // "/v1/audio/speech": v1AudioSpeech,
    "/v1/audio/transcriptions": v1AudioTranscriptions,
  };

  async function v1AudioTranscriptions(this: Server, req: Request, server: Server): Promise<Response> {
    const ROUTE_NAME = "audio/transcriptions";
    const state: PluginStateStorage = {};

    const prepare = await prepareProxyReqToUpstream(storage, state, req, ROUTE_NAME, {
      allowedMethod: ["POST"],
      shouldBeForm: true,
    });
    if ("resp" in prepare) return prepare.resp;

    let upstream: ParsedAIUpstream | undefined;
    const { body, method, url } = prepare;
    if (body.modelId) upstream = storage.getUpstreamByModel(body.modelId);
    if (!upstream) {
      printIncomingForProxy(ROUTE_NAME, method, url, undefined, body.modelId);
      return RESP_NOT_FOUND;
    }

    url.pathname = url.pathname.replace(/^\/v1\//, "/");
    return await proxyReqToUpstream(storage, state, upstream, method, url, req.headers, body, ROUTE_NAME);
  }
}
