import type { ParsedAIUpstream } from "../config/parsers/ai-upstream.js";
import type { StorageManager } from "../storage/index.js";
import { fetchUpstreamJSON } from "./base/fetch.js";
import type { OpenAIModelsResult } from "../api-types.js";
import type { JSONSchema } from "../utils/json-schema/schema-types.js";
import { COLORS_ALL } from "../utils/colors/index.js";
import { resolveUpstreamURL } from "./base/upstream-url.js";
import { updateHeadersToUpstream } from "./base/upstream-headers.js";

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
  const headers = new Headers();
  if (!upstream.only_public_models) updateHeadersToUpstream(headers, upstream, false);

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

  storage.kv.set(`models:${upstream.name}:${upstream.hash}`, models, 24 * 3600 * 1000);
  return models;
}

export function getModelsFromDatabase(storage: StorageManager, upstream: ParsedAIUpstream) {
  const models = storage.kv.get(`models:${upstream.name}:${upstream.hash}`);
  if (models) storage.models.update(upstream.name, models.data);
  return models;
}

export async function getOrUpdateModels(storage: StorageManager, upstream: ParsedAIUpstream) {
  const fromDB = getModelsFromDatabase(storage, upstream);
  if (fromDB) return { models: fromDB, from: "db" };
  const fromUpstream = await updateModelsFromUpstream(storage, upstream);
  return { models: fromUpstream, from: "api" };
}
