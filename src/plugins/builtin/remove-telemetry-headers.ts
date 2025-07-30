import type { Plugin, PluginInitFn } from "../types.ts";
import type { JSONSchema } from "../../utils/json-schema/schema-types.ts";

const pluginName = "remove-telemetry-headers";
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
