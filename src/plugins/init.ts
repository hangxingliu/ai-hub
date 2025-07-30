import { resolve } from "node:path";

import type { PluginInConfig } from "../config/types.ts";
import type { StorageManager } from "../storage/index.ts";
import { COLORS_ALL } from "../utils/colors/index.ts";
import { Tick } from "../utils/tick.ts";
import { BUILTIN_PLUGINS } from "./index.ts";
import { getErrorMessage } from "../utils/error.ts";

export async function initPlugins(storage: StorageManager, plugins: PluginInConfig[]) {
  const loaded = new Set<string>();
  storage.plugins.forEach(({ pluginName }) => loaded.add(pluginName));

  for (const rawPlugin of plugins) {
    let pluginName = rawPlugin.use;
    let Plugin = BUILTIN_PLUGINS.find((it) => it.pluginName === rawPlugin.use);
    if (!Plugin) {
      const pluginEntrypoint = resolve(storage.config.baseDir, rawPlugin.use);
      try {
        Plugin = (await import(pluginEntrypoint)).default;
      } catch (error) {
        console.error(`Error: Failed to load the plugin "${pluginName}": ${getErrorMessage(error)}`);
        continue;
      }
      if (!Plugin || typeof Plugin !== "function") {
        console.error(`Error: Invalid plugin "${pluginName}": It is not a function`);
        continue;
      }
      if (typeof Plugin.pluginName === "string") pluginName = Plugin.pluginName;
      if (loaded.has(pluginName)) {
        console.warn(`Warn: Duplicate plugin "${pluginName}"`);
        continue;
      }
    }

    const { tick } = new Tick();
    try {
      const pluginConfigs = rawPlugin.configs || {};
      const plugin = await Plugin({ storage, configs: pluginConfigs });
      storage.plugins.push(Object.assign(plugin, { pluginName }));
      loaded.add(pluginName);
    } catch (error) {
      console.error(`Error: failed to init the plugin "${pluginName}"`);
      console.error(error);
      continue;
    }

    const t = tick();
    let log = `Loaded plugin ${COLORS_ALL.CYAN_DARK}"${pluginName}"${COLORS_ALL.RESET}`;
    if (t.ms > 50) log += ` ${COLORS_ALL.ORANGE}+ ${t.str}${COLORS_ALL.RESET}`;
    console.log(log);
  }
}
