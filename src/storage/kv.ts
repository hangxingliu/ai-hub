import type { OpenAIModelsResult } from "../api-types.js";

export type KVs = {
  last_models_fetch: number;
  [cachedModels: `models:${string}:${string}`]: OpenAIModelsResult;
  [cachedSession: `sessions:${string}`]: { name: string; endpoint: string };
};
