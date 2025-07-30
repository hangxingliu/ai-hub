import type { Plugin, PluginInitFn } from "../types.ts";
import type { JSONSchema } from "../../utils/json-schema/schema-types.ts";
import type { TypeFromJSONSchema } from "../../utils/json-schema/types.ts";

const pluginName = "remove-telemetry-headers";
const configSchema = {
  type: "object",
  properties: {},
} satisfies JSONSchema;

const pluginInit: PluginInitFn<TypeFromJSONSchema<typeof configSchema>> = ({ storage }) => {
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
  };
};

export default Object.assign(pluginInit, { pluginName, configSchema }) as Plugin;
