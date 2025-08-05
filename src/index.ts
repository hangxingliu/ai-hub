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
import { initPlugins } from "./plugins/init.ts";
import { DEFAULT_PLUGINS } from "./plugins/index.ts";
//
import FAV_ICON_PATH from "../assets/favicon.ico";
import { parseSizeString } from "./utils/parse-size.ts";
import { ConfigFileWatcher } from "./config/watcher.ts";
import { COLORS_ALL } from "./utils/colors/index.ts";
import { createV1AudioRoutes } from "./routes/v1-audio.ts";

const { values: options, positionals: args } = parseArgs({
  options: {
    config: { short: "c", type: "string" },
  },
  allowNegative: false,
  allowPositionals: true,
});
if (!options.config) throw new Error(`Please provide the required flag "--config"`);

const config = await loadConfigFile(options.config);
const configWatcher = new ConfigFileWatcher(options.config);

let storage = new StorageManager(config);
let server: Bun.Server | undefined;
let startingServer: Promise<void> | undefined;

async function startServer() {
  if (server) {
    console.log(`${COLORS_ALL.GREEN_DARK}Reloading the http server ...${COLORS_ALL.RESET}`);
    await server.stop(true);
  }

  await initPlugins(storage, Array.isArray(config.plugins) ? config.plugins : [...DEFAULT_PLUGINS]);
  for (const upstream of storage.upstreams) {
    const { models, from } = await getOrUpdateModels(storage, upstream);
    console.log(`Loaded ${models.data.length} ${upstream.name} models from ${from}`);
  }

  const listen = getBunServerListenOptions(config);

  server = Bun.serve({
    ...listen.options,
    development: false,
    fetch: createFallbackRoute(storage),
    maxRequestBodySize: parseSizeString(config.max_request_body_size || "128MiB"),
    routes: {
      "/": createHomePageRoute(storage),
      "/favicon.ico": Bun.file(FAV_ICON_PATH),
      "/v1/models": {
        GET: createV1ModelsRoute(storage),
      },
      // gemni api:
      // https://ai.google.dev/api/models#models_get-SHELL
      "/v1beta/models": new Response("WIP", { status: 404 }),
    },
  });
  console.log(`The AI hub server is listening on ${server.url}`);
}

startServer();
configWatcher.listenOnFileChanged(async (newConfig) => {
  if (startingServer) await startingServer;

  storage = new StorageManager(newConfig, storage);
  startingServer = startServer();
  startingServer = undefined;
});

BeforeExit.addEventListener(async () => {
  if (server) {
    console.log(`Stoping HTTP server ...`);
    await server.stop(true);
  }
  configWatcher.close();
  storage.close();
});
