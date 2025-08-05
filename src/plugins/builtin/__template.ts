import type { Plugin, PluginInitFn } from "../types.js";
import type { JSONSchema } from "../../utils/json-schema/schema-types.js";
import type { TypeFromJSONSchema } from "../../utils/json-schema/types.js";

const pluginName = "CHANGE_THIS_TO_YOUR_PLUGIN_NAME";
const configSchema = {
  type: "object",
  properties: {},
} satisfies JSONSchema;

const pluginInit: PluginInitFn<TypeFromJSONSchema<typeof configSchema>> = () => {
  return {
    // IMPLEMENT PLUGIN AT HERE ...
  };
};

export default Object.assign(pluginInit, { pluginName, configSchema }) as Plugin;
