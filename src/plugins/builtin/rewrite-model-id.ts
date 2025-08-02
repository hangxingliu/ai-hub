import type { Plugin, PluginInitFn } from "../types.ts";
import type { JSONSchema } from "../../utils/json-schema/schema-types.ts";
import type { TypeFromJSONSchema } from "../../utils/json-schema/types.ts";
import { COLORS_ALL } from "../../utils/colors/index.ts";

const pluginName = "rewrite-model-id";
const configSchema = {
  type: "object",
  properties: {
    rules: {
      type: "array",
      items: {
        type: "object",
        properties: {
          match: {
            type: "string",
            description: "a regular expression for matching the model name (full match)",
          },
          replace: {
            type: "string",
            description: "replaced model name, you can use $1, $2, $3, ... to represent captured groups",
          },
        },
        required: ["match", "replace"],
      },
    },
  },
} satisfies JSONSchema;

type Configs = TypeFromJSONSchema<typeof configSchema>;

const pluginInit: PluginInitFn<Configs> = ({ configs }) => {
  const rules = (configs.rules || []).map((it) => {
    return { match: buildRegExp(it.match), replace: it.replace };
  });

  return {
    initialized: `${rules.length} rule(s)`,

    transformModelId(args) {
      if (!args.modelId) return;
      for (const rule of rules) {
        const matched = args.modelId.match(rule.match);
        if (!matched) continue;

        const modelId = rule.replace.replace(/\$([\$\&]|[0-9][0-9]?)/, (_, ch) => {
          if (ch === "&") return matched[0];
          if (ch === "$") return "$";
          const int = parseInt(ch, 10);
          if (Number.isInteger(int) && int > 0) return matched[int];
          console.warn(`warn: Invalid placeholder '${_}'`);
          return _;
        });

        const log = `rerwitten the model to '${COLORS_ALL.ORANGE}${modelId}${COLORS_ALL.RESET}'`;
        console.log(`   \`- ${log}`);
        args.modelId = modelId;
        return;
      }
      // end of transformModelId
    },
  };
};

function buildRegExp(pattern: string) {
  return new RegExp("^" + pattern + "$", "i");
}
export default Object.assign(pluginInit, { pluginName, configSchema }) as Plugin;
