import type { ParsedAIUpstream } from "../config/parsers/ai-upstream.ts";
import type { StorageManager } from "../storage/index.ts";
import { fetchUpstreamJSON } from "./base/fetch.ts";
import type { OpenAIModelsResult } from "../api-types.ts";
import type { JSONSchema } from "../utils/json-schema/schema-types.ts";
import { COLORS_ALL } from "../utils/colors/index.ts";
import { resolveUpstreamURL } from "./base/upstream-url.ts";

const MODELS_RESULT_SCHEMA: JSONSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
      },
    },
  },
  required: ["data"],
};

export async function updateModelsFromUpstream(storage: StorageManager, upstream: ParsedAIUpstream) {
  const apiURL = resolveUpstreamURL(upstream.endpoint, "/models");
  const headers: Bun.HeadersInit = {};
  if (upstream.default_api_key) headers["Authorization"] = `Bearer ${upstream.default_api_key}`;

  const models = await fetchUpstreamJSON<OpenAIModelsResult>(
    apiURL,
    {
      method: "GET",
      headers,
      proxy: upstream.proxy,
      redirect: "follow",
    },
    storage,
    MODELS_RESULT_SCHEMA
  );

  const changes = storage.models.update(upstream.name, models.data);
  let log = `updated ${models.data.length} models from "${upstream.name}"`;
  if (changes.removedModels.length)
    log += ` ${COLORS_ALL.RED_LIGHT}removed=${JSON.stringify(changes.removedModels)}${COLORS_ALL.RESET}`;
  if (changes.newModels.length)
    log += ` ${COLORS_ALL.CYAN_DARK}new=${JSON.stringify(changes.newModels)}${COLORS_ALL.RESET}`;
  console.log(log);

  storage.kv.set(`models:${upstream.name}:${upstream.hash}`, models);
  return models;
}

export function getModelsFromDatabase(storage: StorageManager, upstream: ParsedAIUpstream) {
  const models = storage.kv.get(`models:${upstream.name}:${upstream.hash}`);
  if (models) storage.models.update(upstream.name, models.data);
  return models;
}

export async function getOrUpdateModels(storage: StorageManager, upstream: ParsedAIUpstream) {
  const fromDB = getModelsFromDatabase(storage, upstream);
  if (fromDB) return fromDB;
  const fromUpstream = await updateModelsFromUpstream(storage, upstream);
  return fromUpstream;
}
