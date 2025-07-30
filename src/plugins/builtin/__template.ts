import type { Plugin, PluginInitFn } from "../types.ts";

const pluginName = "CHANGE_THIS_TO_YOUR_PLUGIN_NAME";
const pluginInit: PluginInitFn = () => {
  return {
    // IMPLEMENT PLUGIN AT HERE ...
  };
};

export default Object.assign(pluginInit, { pluginName }) as Plugin;
