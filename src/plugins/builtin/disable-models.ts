import type { Plugin, PluginInitFn } from "../types.js";
import type { JSONSchema } from "../../utils/json-schema/schema-types.js";
import type { TypeFromJSONSchema } from "../../utils/json-schema/types.js";
import { COLORS_ALL } from "../../utils/colors/index.js";

const pluginName = "disable-models";
const configSchema = {
  type: "object",
  properties: {
    patterns: {
      type: "array",
      items: {
        type: "string",
        description: "a regualr expression for matching model name",
      },
    },
    status_code: {
      type: "integer",
      default: 404,
    },
  },
} satisfies JSONSchema;

type Configs = TypeFromJSONSchema<typeof configSchema>;

const pluginInit: PluginInitFn<Configs> = ({ configs }) => {
  const patterns = (configs.patterns || []).map(buildRegExp);

  let statusCode = configs.status_code;
  if (!Number.isSafeInteger(statusCode) || statusCode <= 0) statusCode = 404;

  return {
    initialized: `${patterns.length} pattern(s)`,

    transformJsonBody(args) {
      if (!args.modelId) return;
      for (const pattern of patterns) {
        if (pattern.test(args.modelId)) {
          const log = `killed this "${args.modelId}" request (pattern=${pattern.toString()})`;
          console.log(`   ${COLORS_ALL.RED}${log}${COLORS_ALL.RESET}`);
          return args.kill(statusCode);
        }
      }
      // end of transformJsonBody
    },
  };
};

function buildRegExp(pattern: string) {
  return new RegExp(pattern, "i");
}
export default Object.assign(pluginInit, { pluginName, configSchema }) as Plugin;
