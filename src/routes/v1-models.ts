import { RESP_METHOD_NOT_ALLOWED, RESP_WIP } from "../services/base/basic-responses.js";
import { printIncoming } from "../services/base/incoming-print.js";
import { updateModelsFromUpstream } from "../services/list-model.js";
import { createWellKnownRouteProxy } from "../services/proxy-well-known-routes.js";
import type { StorageManager } from "../storage/index.js";

export function createV1ModelsRoutes(storage: StorageManager) {
  const MIN_INTERVAL = 15 * 60 * 1000;
  let lastFetch: number | undefined;

  return {
    "/v1/models": listAllModels,
    "/v1/models/:model_id": createWellKnownRouteProxy(storage, "/v1/models/:model_id"),
    "/v1/language-models": createWellKnownRouteProxy(storage, "/v1/language-models"),
    "/v1/language-models/:model_id": createWellKnownRouteProxy(storage, "/v1/language-models/:model_id"),
    "/v1/image-generation-models": createWellKnownRouteProxy(storage, "/v1/image-generation-models"),
    "/v1/image-generation-models/:model_id": createWellKnownRouteProxy(
      storage,
      "/v1/image-generation-models/:model_id"
    ),
    // gemni api:
    // https://ai.google.dev/api/models#models_get-SHELL
    "/v1beta/models": RESP_WIP,
  };

  async function listAllModels(req: Bun.BunRequest<"/v1/models">): Promise<Response> {
    printIncoming("models", req.method, req.url);
    if (req.method !== "GET") return RESP_METHOD_NOT_ALLOWED;

    if (typeof lastFetch === "undefined") lastFetch = storage.kv.get("last_models_fetch") || 0;
    let anyError: unknown;
    if (Date.now() - lastFetch > MIN_INTERVAL) {
      for (const upstream of storage.upstreams) {
        try {
          await updateModelsFromUpstream(storage, upstream);
        } catch (error) {
          anyError = error;
          console.error(error);
        }
      }
      lastFetch = Date.now();
      storage.kv.set("last_models_fetch", lastFetch);
      if (anyError) throw anyError;
    }

    return Response.json(storage.models.getResponse(storage.config.override_model_owned_by));
  }
}
