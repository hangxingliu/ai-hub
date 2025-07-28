import type { OpenAIModelsResult } from "../api-types.ts"

export type KVs = {
  [cachedModels: `models:${string}:${string}`]: OpenAIModelsResult
  [cachedSession: `sessions:${string}`]: { name: string, endpoint: string };
}
