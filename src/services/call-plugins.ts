import type { PluginInstance, PluginArgs, ResolvedPlugin, PluginInternalArgs } from "../plugins/types.ts";
import { getErrorMessage } from "../utils/error.ts";

export type PluginResult = { response?: Response };

export async function callPlugins<Method extends keyof PluginInstance>(
  plugins: ReadonlyArray<ResolvedPlugin>,
  method: Method,
  ...args: PluginArgs<Method> extends (infer Param)[] ? Omit<Param, "kill">[] : never
): Promise<PluginResult> {
  let response: Response | undefined;
  const kill = (statusCode?: number) => {
    response = new Response(null, { status: statusCode || 500 });
  };
  const internalArgs: PluginInternalArgs = { kill };

  for (const plugin of plugins) {
    const fn = plugin[method] as (...args: any[]) => any;
    if (typeof fn !== "function") continue;
    try {
      Object.assign(args[0], internalArgs);
      await fn.apply(null, args);
    } catch (error) {
      const path = `plugin[${plugin.pluginName}].${method}:`;
      console.error(`Error in ${path} ${getErrorMessage(error)}`);
    }
    if (response) break;
  }

  return { response };
}
