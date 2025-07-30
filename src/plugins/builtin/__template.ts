import type { Plugin, PluginInitFn } from "../types.ts";
import type { JSONSchema } from "../../utils/json-schema/schema-types.ts";

const pluginName = "CHANGE_THIS_TO_YOUR_PLUGIN_NAME";
export const pluginSchema = {
  type: "object",
  properties: {
    use: { type: "string", const: pluginName },
    configs: {
      type: "object",
      additionalProperties: true,
      properties: {
      },
    },
  },
  required: ['use']
} satisfies JSONSchema;

const pluginInit: PluginInitFn = () => {
  return {
    // IMPLEMENT PLUGIN AT HERE ...
  };
};

export default Object.assign(pluginInit, { pluginName }) as Plugin;
