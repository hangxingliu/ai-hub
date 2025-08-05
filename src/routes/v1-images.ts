import type { StorageManager } from "../storage/index.js";
import { createWellKnownRouteProxy } from "../services/proxy-well-known-routes.js";

/**
 * @see https://platform.openai.com/docs/api-reference/images/create
 * @see https://docs.x.ai/docs/api-reference#image-generations
 */
export function createV1ImagesRoutes(storage: StorageManager) {
  return {
    "/v1/images/generations": createWellKnownRouteProxy(storage, "/v1/images/generations"),
    "/v1/images/edits": createWellKnownRouteProxy(storage, "/v1/images/edits"),
    "/v1/images/variations": createWellKnownRouteProxy(storage, "/v1/images/variations"),
  };
}
