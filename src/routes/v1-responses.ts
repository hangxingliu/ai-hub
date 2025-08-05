import type { StorageManager } from "../storage/index.js";
import { createWellKnownRouteProxy } from "../services/proxy-well-known-routes.js";

/**
 * @see https://platform.openai.com/docs/api-reference/chat/create
 */
export function createV1ResponsesRoutes(storage: StorageManager) {
  return {
    "/v1/responses": createWellKnownRouteProxy(storage, "/v1/responses"),
    "/v1/responses/:request_id": createWellKnownRouteProxy(storage, "/v1/responses/:request_id"),
    "/v1/responses/:request_id/cancel": createWellKnownRouteProxy(storage, "/v1/responses/:request_id/cancel"),
    "/v1/responses/:request_id/input_items": createWellKnownRouteProxy(
      storage,
      "/v1/responses/:request_id/input_items"
    ),
  };
}
