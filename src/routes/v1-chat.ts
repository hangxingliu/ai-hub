import type { StorageManager } from "../storage/index.js";
import { createWellKnownRouteProxy } from "../services/proxy-well-known-routes.js";

/**
 * @see https://platform.openai.com/docs/api-reference/chat/create
 */
export function createV1ChatRoutes(storage: StorageManager) {
  return {
    "/v1/chat/completions": createWellKnownRouteProxy(storage, "/v1/chat/completions"),
  };
}
