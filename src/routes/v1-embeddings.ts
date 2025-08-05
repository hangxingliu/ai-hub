import type { StorageManager } from "../storage/index.js";
import { createWellKnownRouteProxy } from "../services/proxy-well-known-routes.js";

export function createV1EmbeddingsRoutes(storage: StorageManager) {
  return {
    "/v1/embeddings": createWellKnownRouteProxy(storage, "/v1/embeddings"),
    "/v1/tokenize-text": createWellKnownRouteProxy(storage, "/v1/tokenize-text"),
  };
}
