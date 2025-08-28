/// <reference path="./assets.d.ts" />

import { parseArgs } from "node:util";
import { loadConfigFile } from "./config/loader.js";
import { getOrUpdateAllModels, getOrUpdateModels } from "./services/list-model.js";
import { StorageManager } from "./storage/index.js";
import { getBunServerListenOptions } from "./config/parsers/server.js";
import { BeforeExit } from "./utils/before-exit.js";
import { initPlugins } from "./plugins/init.js";
import { DEFAULT_PLUGINS } from "./plugins/index.js";
//
import FAV_ICON_PATH from "../assets/favicon.ico";
import { parseSizeString } from "./utils/parse-size.js";
import { ConfigFileWatcher } from "./config/watcher.js";
import { COLORS_ALL } from "./utils/colors/index.js";
//
import { createV1AudioRoutes } from "./routes/v1-audio.js";
import { createV1ChatRoutes } from "./routes/v1-chat.js";
import { createV1ImagesRoutes } from "./routes/v1-images.js";
import { createV1ModelsRoutes } from "./routes/v1-models.js";
import { createV1EmbeddingsRoutes } from "./routes/v1-embeddings.js";
import { createV1ResponsesRoutes } from "./routes/v1-responses.js";
import { createHomePageRoute } from "./routes/homepage.js";
import { createFallbackRoute } from "./routes/index.js";

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
  await getOrUpdateAllModels(storage, false);

  const listen = getBunServerListenOptions(config);

  const v1AudioRoutes = createV1AudioRoutes(storage);
  const v1ImageRoutes = createV1ImagesRoutes(storage);
  const v1ResponsesRoutes = createV1ResponsesRoutes(storage);
  const v1ChatRoutes = createV1ChatRoutes(storage);
  const v1Models = createV1ModelsRoutes(storage);
  const v1Embeddings = createV1EmbeddingsRoutes(storage);

  server = Bun.serve({
    ...listen.options,
    development: false,
    fetch: createFallbackRoute(storage),
    maxRequestBodySize: parseSizeString(config.max_request_body_size || "128MiB"),
    routes: {
      "/": createHomePageRoute(storage),
      "/favicon.ico": Bun.file(FAV_ICON_PATH),
      ...v1AudioRoutes,
      ...v1ImageRoutes,
      ...v1ResponsesRoutes,
      ...v1ChatRoutes,
      ...v1Embeddings,
      ...v1Models,
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
