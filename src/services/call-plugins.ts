import type { PluginInstance, PluginArgs, ResolvedPlugin } from "../api-types.ts";
import { getErrorMessage } from "../utils/error.ts";

export async function callPlugins<Method extends keyof PluginInstance>(
  plugins: ReadonlyArray<ResolvedPlugin>,
  method: Method,
  ...args: PluginArgs<Method>
) {
  for (const plugin of plugins) {
    const fn = plugin[method] as (...args: any[]) => any;
    if (typeof fn !== "function") continue;
    try {
      await fn.apply(null, args);
    } catch (error) {
      const path = `plugin[${plugin.pluginName}].${method}:`;
      console.error(`Error in ${path} ${getErrorMessage(error)}`);
    }
  }
}
