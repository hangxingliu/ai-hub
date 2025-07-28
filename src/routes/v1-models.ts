import { printIncoming } from "../services/base/incoming.ts";
import type { StorageManager } from "../storage/index.ts";

export function createV1ModelsRoute(storage: StorageManager) {
  return async function (req: Bun.BunRequest<"/v1/models">): Promise<Response> {
    printIncoming('models', req.method, req.url);
    return Response.json(storage.models.getResponse(storage.config.override_model_owned_by));
  };
}
