import type { ParsedAIUpstream } from "../config/parsers/ai-upstream.js";
import type { StorageManager } from "../storage/index.js";
import { fetchUpstreamJSON } from "./base/fetch.js";
import type { OpenAIModel, OpenAIModelsResult } from "../api-types.js";
import type { JSONSchema } from "../utils/json-schema/schema-types.js";
import { COLORS_ALL } from "../utils/colors/index.js";
import { resolveUpstreamURL } from "./base/upstream-url.js";
import { updateHeadersToUpstream } from "./base/upstream-headers.js";
import type { TypeFromJSONSchema } from "../utils/json-schema/types.js";

const MODELS_RESULT_SCHEMA = {
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
} satisfies JSONSchema;

const GOOGLE_MODELS_RESULT_SCHEMA = {
  type: "object",
  properties: {
    models: {
      type: "array",
      items: {
        type: "object",
        properties: {
          // "name": "models/embedding-gecko-001",
          name: { type: "string" },
          // "version": "001",
          version: { type: "string" },
          // "displayName": "Embedding Gecko",
          displayName: { type: "string" },
        },
        required: ["name", "version", "displayName"],
      },
    },
  },
  required: ["models"],
} satisfies JSONSchema;

export async function updateModelsFromUpstream(storage: StorageManager, upstream: ParsedAIUpstream) {
  const apiURL = resolveUpstreamURL(upstream.endpoint, "/models");
  const headers = new Headers();
  if (!upstream.only_public_models) updateHeadersToUpstream(headers, upstream, false);

  const req: BunFetchRequestInit = {
    method: "GET",
    headers,
    proxy: upstream.proxy,
    redirect: "follow",
  };

  let models: OpenAIModelsResult;
  if (upstream.type === "google") {
    type ResType = TypeFromJSONSchema<typeof GOOGLE_MODELS_RESULT_SCHEMA>;
    const res = await fetchUpstreamJSON<ResType>(apiURL, req, storage, GOOGLE_MODELS_RESULT_SCHEMA);
    models = {
      object: "list",
      data: res.models.map((it) => ({
        id: it.name,
        created: 0,
        object: "model",
        owned_by: "google",
      })),
    };
  } else {
    const res = await fetchUpstreamJSON<OpenAIModelsResult>(apiURL, req, storage, MODELS_RESULT_SCHEMA);
    models = res;
  }

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

export async function getOrUpdateAllModels(storage: StorageManager) {
  const promises = storage.upstreams.map(async (upstream) => {
    try {
      const { models, from } = await getOrUpdateModels(storage, upstream);
      console.log(`Loaded ${models.data.length} ${upstream.name} models from ${from}`);
    } catch (error) {
      console.error(`Failed to load models from the upstream ${upstream.name}:`);
      console.error(error);
    }
  });
  await Promise.all(promises);
}
