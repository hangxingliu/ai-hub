import type { Plugin, PluginInitFn } from "../types.ts";

const pluginName = "debug-request-messages";

const pluginInit: PluginInitFn = ({ storage }) => {
  return {
    transformJsonBody: (args) => {
      const body = args.body;
      const messages = body.messages;
      // https://platform.openai.com/docs/api-reference/chat/create
      if (Array.isArray(messages)) {
        const counts = new Map<string, any[]>();
        for (const msg of messages) {
          if (!msg) continue;
          let list = counts.get(msg.role || "");
          if (list) list.push(msg);
          else counts.set(msg.role || "", [msg]);
        }

        const logs: string[] = [];
        counts.forEach((v, k) => logs.push(`${v.length} ${k || '"no-role"'}`));
        console.log(`   \`- messages: ${logs.join(", ")}`);

        let index = 0;
        for (const msg of messages) {
          const { content, role } = msg;
          if (!content || !role) continue;

          let msgStr = String(content || "").replace(/\s+/g, " ");
          if (msgStr.length > 256) msgStr = msgStr.slice(0, 256) + "...";
          console.log(`  \`- [${index++}]: ${String(role || "").padStart(9)}: ${msgStr}`);
        }
      }
    },
  };
};

export default Object.assign(pluginInit, { pluginName }) as Plugin;
