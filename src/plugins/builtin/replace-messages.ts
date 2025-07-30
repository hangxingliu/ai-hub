import type { Plugin, PluginInitFn } from "../types.ts";
import type { JSONSchema } from "../../utils/json-schema/schema-types.ts";
import type { TypeFromJSONSchema } from "../../utils/json-schema/types.ts";
import type { OpenAIChatMessages } from "../../api-types.ts";
import { COLORS_ALL } from "../../utils/colors/index.ts";

const DEFAULT_REGEXP_FLAGS = "gi";

const pluginName = "replace-messages";
const configSchema = {
  type: "object",
  additionalProperties: true,
  properties: {
    rules: {
      type: "array",
      items: {
        type: "object",
        properties: {
          model_regexp: { type: "string" },
          search: { type: "string" },
          replace: { type: "string" },
          regex: {
            type: "string",
            pattern: "^[gimsu]+$",
            description: `the flags of regular expression. default: ${DEFAULT_REGEXP_FLAGS}`,
          },
        },
        required: ["search", "replace"],
      },
    },
  },
  required: ["rules"],
} satisfies JSONSchema;

type Configs = TypeFromJSONSchema<typeof configSchema>;
type Rule = Configs["rules"][0];

const pluginInit: PluginInitFn<Configs> = ({ configs }) => {
  const rules = configs.rules.map((it) => ({ ...it, re: buildRegExp(it) }));
  return {
    initialized: `${rules.length} replace rules`,

    transformJsonBody(args) {
      const body = args.body;
      const messages = body.messages as OpenAIChatMessages;
      if (!Array.isArray(messages)) return;

      let count = 0;
      for (const msg of messages) {
        if (!msg || !msg.content) continue;

        if (Array.isArray(msg.content)) {
          for (const item of msg.content) {
            if ("text" in item && typeof item.text === "string" && item.text) {
              const r = executeRules(item.text);
              item.text = r.str;
              count += r.count;
            }
          }
          continue;
        }

        if (typeof msg.content === "string") {
          const r = executeRules(msg.content);
          msg.content = r.str;
          count += r.count;
        }
      }
      if (count > 0)
        console.log(`   \`- replaced ${COLORS_ALL.RED_LIGHT2}${count}${COLORS_ALL.RESET} places in the message`);
    },
  };

  function executeRules(str: string) {
    let count = 0;
    for (const rule of rules) {
      str = str.replace(rule.re, () => {
        count++;
        return rule.replace;
      });
    }
    return { str, count };
  }
};

function buildRegExp(rule: Rule) {
  if (!rule.regex) return new RegExp(plainStringToRegExp(rule.search), DEFAULT_REGEXP_FLAGS);
  return new RegExp(rule.search, rule.regex ?? DEFAULT_REGEXP_FLAGS);
}
function plainStringToRegExp(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export default Object.assign(pluginInit, { pluginName, configSchema }) as Plugin;
