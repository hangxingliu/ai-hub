import type { StorageManager } from "../storage/index.js";
import { createWellKnownRouteProxy } from "../services/proxy-well-known-routes.js";

/**
 * @see https://platform.openai.com/docs/api-reference/audio/createSpeech
 */
export function createV1AudioRoutes(storage: StorageManager) {
  return {
    "/v1/audio/speech": createWellKnownRouteProxy(storage, "/v1/audio/speech"),
    "/v1/audio/transcriptions": createWellKnownRouteProxy(storage, "/v1/audio/transcriptions"),
    "/v1/audio/translations": createWellKnownRouteProxy(storage, "/v1/audio/translations"),
  };
}
