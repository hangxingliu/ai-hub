import { printIncoming } from "../services/base/incoming-print.js";
import { updateModelsFromUpstream } from "../services/list-model.js";
import type { StorageManager } from "../storage/index.js";

export function createV1ModelsRoute(storage: StorageManager) {
  const MIN_INTERVAL = 30 * 60 * 1000;
  let lastFetch: number | undefined;

  return async function (req: Bun.BunRequest<"/v1/models">): Promise<Response> {
    printIncoming("models", req.method, req.url);

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
  };
}
