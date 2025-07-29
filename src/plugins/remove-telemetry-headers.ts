import type { Plugin, PluginInitFn } from "../api-types.ts";

const pluginName = "remove-telemetry-headers";

const pluginInit: PluginInitFn = ({ storage }) => {
  return {
    transformHeaders(args) {
      const keys = Array.from(args.headers.keys());
      for (const key of keys) {
        if (key.toLowerCase().startsWith("x-stainless-")) {
          // console.log(key);
          args.headers.delete(key);
        }
      }
    },
  }
};

export default Object.assign(pluginInit, { pluginName }) as Plugin;
