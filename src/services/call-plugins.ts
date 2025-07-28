import type { Plugin, PluginArgs } from "../api-types.ts";
import { getErrorMessage } from "../utils/error.ts";

export async function callPlugins<Method extends keyof Plugin>(
  plugins: Plugin[],
  method: Method,
  ...args: PluginArgs<Method>
) {
  for (const plugin of plugins) {
    const fn = plugin[method] as (...args: any[]) => any;
    if (typeof fn !== "function") continue;
    try {
      await fn.apply(null, args);
    } catch (error) {
      console.error(`Error in plugin[${plugin.name}].${method}: ${getErrorMessage(error)}`);
    }
  }
}
