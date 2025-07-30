import type { JSONSchema } from "../../utils/json-schema/schema-types.ts";
import type { Plugin, PluginInitFn } from "../types.ts";

const DEFAULT_FLAG = "/only_last";

const pluginName = "keep-only-last-message" as const;
export const pluginSchema = {
  type: "object",
  properties: {
    use: { type: "string", const: pluginName },
    configs: {
      type: "object",
      additionalProperties: true,
      properties: {
        flag: { type: "string", description: `default: ${DEFAULT_FLAG}` },
      },
    },
  },
  required: ['use']
} satisfies JSONSchema;

const pluginInit: PluginInitFn = ({ configs }) => {
  let flag = DEFAULT_FLAG;
  if (typeof configs.flag === "string" && configs.flag) flag = configs.flag;

  return {
    transformJsonBody(args) {
      const body = args.body;
      const messages = body.messages;
      if (!Array.isArray(messages)) return;

      let enabled = false;
      for (const msg of messages) {
        if (!msg || msg.role !== "system" || typeof msg.content !== "string") continue;
        const msgStr = msg.content as string;

        const index = msgStr.indexOf(flag);
        if (index < 0) continue;

        msg.content = msgStr.slice(0, index) + msgStr.slice(index + flag.length);
        enabled = true;
        break;
      }
      if (!enabled) return;

      const lastUserIndex = messages.findLastIndex((it) => it && it.role === "user");

      let reserved: any[] = [];
      let newMessages = messages;
      if (lastUserIndex >= 0) {
        reserved = messages.slice(lastUserIndex);
        newMessages = messages.slice(0, lastUserIndex);
      }
      for (let i = 0; i < newMessages.length; i++) {
        const msg = newMessages[i];
        if (!msg || typeof msg.role !== "string") continue;
        if (msg.role !== "user") continue;

        let remove = 1;
        let nextMsg: any;
        while ((nextMsg = newMessages[i + remove]) && nextMsg.role === "assistant") remove++;
        newMessages.splice(i, remove);
        i--;
      }

      body.messages = newMessages.concat(reserved);
    },
  };
};

export default Object.assign(pluginInit, { pluginName }) as Plugin;
