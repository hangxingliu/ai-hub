/// <reference path="./assets.d.ts" />

import { parseArgs } from "node:util";
import { loadConfigFile } from "./config/loader.ts";
import { getOrUpdateModels, updateModelsFromUpstream } from "./services/list-model.ts";
import { StorageManager } from "./storage/index.ts";
import { getBunServerListenOptions } from "./config/parsers/server.ts";
import { BeforeExit } from "./utils/before-exit.ts";
import { createV1ModelsRoute } from "./routes/v1-models.ts";
import { createFallbackRoute } from "./routes/index.ts";
import { createHomePageRoute } from "./routes/homepage.ts";
import removeTelemetryHeaders from "./plugins/remove-telemetry-headers.ts";
import debugRequestMessages from "./plugins/debug-request-messages.ts";
import keepOnlyLastMessage from "./plugins/keep-only-last-message.ts";
import FAV_ICON_PATH from "../assets/favicon.ico" with { loader: "file" };

const { values: options, positionals: args } = parseArgs({
  options: {
    config: { short: "c", type: "string" },
  },
  allowNegative: false,
  allowPositionals: true,
});
if (!options.config) throw new Error(`Please provide the required flag "--config"`);

const config = await loadConfigFile(options.config);
const listen = getBunServerListenOptions(config);

const storage = new StorageManager(config);
storage.plugins.push(
  //
  removeTelemetryHeaders,
  keepOnlyLastMessage,
  // debugRequestMessages
);

for (const upstream of storage.upstreams) await getOrUpdateModels(storage, upstream);

const server = Bun.serve({
  ...listen.options,
  development: false,
  fetch: createFallbackRoute(storage),
  routes: {
    "/": createHomePageRoute(storage),
    "/favicon.ico": Bun.file(FAV_ICON_PATH),
    "/v1/models": {
      GET: createV1ModelsRoute(storage),
    },
  },
});
console.log(`The AI hub server is listening on ${server.url}`);

BeforeExit.addEventListener(async () => {
  console.log(`stoping HTTP server ...`);
  await server.stop(true);
  storage.close();
});
