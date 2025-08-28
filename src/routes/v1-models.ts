import { RESP_METHOD_NOT_ALLOWED, RESP_WIP } from "../services/base/basic-responses.js";
import { printIncoming } from "../services/base/incoming-print.js";
import { getOrUpdateAllModels, updateModelsFromUpstream } from "../services/list-model.js";
import { createWellKnownRouteProxy } from "../services/proxy-well-known-routes.js";
import type { StorageManager } from "../storage/index.js";

export function createV1ModelsRoutes(storage: StorageManager) {
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

    await getOrUpdateAllModels(storage, true);
    return Response.json(storage.models.getResponse(storage.config.override_model_owned_by));
  }
}
