import type { Plugin, PluginInitFn } from "../types.ts";
import type { JSONSchema } from "../../utils/json-schema/schema-types.ts";
import type { TypeFromJSONSchema } from "../../utils/json-schema/types.ts";
import type { OpenAIChatParams } from "../../api-types.ts";
import { COLORS_ALL } from "../../utils/colors/index.ts";

const pluginName = "debug-request-messages";
const configSchema = {
  type: "object",
  properties: {},
} satisfies JSONSchema;

const pluginInit: PluginInitFn<TypeFromJSONSchema<typeof configSchema>> = ({ storage }) => {
  return {
    transformJsonBody: (args) => {
      const body = args.body as OpenAIChatParams;

      const tools: string[] = [];
      if (body.tools) {
        for (const tool of body.tools)
          tools.push((tool.type === "function" ? "" : `${tool.type} `) + tool.function?.name || "");
      }

      const opts: string[] = [];
      if ("n" in body) opts.push(`n=${body.n}`);
      if ("temperature" in body) opts.push(`temperature=${body.temperature}`);
      if ("top_p" in body) opts.push(`top_p=${body.top_p}`);
      if ("seed" in body) opts.push(`seed=${body.seed}`);
      if ("frequency_penalty" in body) opts.push(`temperature=${body.frequency_penalty}`);
      if ("stop" in body) opts.push(`stop=${JSON.stringify(body.stop)}`);
      if ("search_parameters" in body) opts.push(`search_parameters=${JSON.stringify(body.search_parameters)}`);
      if ("reasoning_effort" in body) opts.push(`reasoning_effort=${JSON.stringify(body.reasoning_effort)}`);
      if (opts.length > 0) console.log(`   \`- opts: ${opts.join(", ")}`);

      // https://platform.openai.com/docs/api-reference/chat/create
      if (!Array.isArray(body.messages)) return;

      const counts = new Map<string, any[]>();
      for (const msg of body.messages) {
        if (!msg) continue;
        let list = counts.get(msg.role || "");
        if (list) list.push(msg);
        else counts.set(msg.role || "", [msg]);
      }

      const logs: string[] = [];
      counts.forEach((v, k) => logs.push(`${v.length} ${k || '"no-role"'}`));
      logs[0] = logs.join(", ");
      logs.length = 1;
      if (tools.length > 0) logs.push(`; tools: ${tools.join(", ")}`);
      console.log(`   \`- messages: ${logs.join("")}`);

      let index = 0;
      for (const msg of body.messages) {
        const { content, role } = msg;
        if (!content || !role) continue;

        if (Array.isArray(content)) {
          for (let i = 0; i < content.length; i++) {
            const ctx = content[i];
            printMsg(index, `${role}[${i}]`, "text" in ctx && ctx.text ? ctx.text : ctx.type);
          }
        } else {
          printMsg(index, `${role}`, content);
        }
        index++;
      }
      // end of transformJsonBody
    },
  };
};

function printMsg(index: number, prefix: string, text: string) {
  console.log(`${COLORS_ALL.DIM}   \`- [${index}]: ${String(prefix).padStart(10)}: ${sampleString(text)}${COLORS_ALL.RESET}`);
}
function sampleString(str: string) {
  str = String(str).replace(/\s+/g, " ");
  if (str.length > 128) return str.slice(0, 128) + `... (len=${str.length})`;
  return str;
}

export default Object.assign(pluginInit, { pluginName, configSchema }) as Plugin;
