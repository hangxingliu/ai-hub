import type { StorageManager } from "../storage/index.ts";
import { COLORS_ALL } from "../utils/colors/index.ts";
import { Tick } from "../utils/tick.ts";
import { BUILTIN_PLUGINS } from "./index.ts";

/** @TODO add support for external plugins  */
export async function initPlugins(storage: StorageManager, pluginNames: ReadonlyArray<string>) {
  for (const pluginName of pluginNames) {
    const Plugin = BUILTIN_PLUGINS.find((it) => it.pluginName === pluginName);
    if (!Plugin) {
      console.error(`Error: unknown plugin "${pluginName}"`);
      continue;
    }

    const { tick } = new Tick();
    try {
      const plugin = await Plugin({ storage });
      storage.plugins.push(Object.assign(plugin, { pluginName }));
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
