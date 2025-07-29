import { OpenAI } from "openai";
import type { StorageManager } from "./storage/index.ts";

export type OpenAIModel = OpenAI.Model;
export type OpenAIModelWithUpstream = OpenAI.Model & { upstream: string };
export type OpenAIModelsResult = {
  object: "list";
  data: OpenAIModel[];
};

export type PluginArgs<Method extends keyof Plugin> = Required<Plugin>[Method] extends (...args: infer Params) => any
  ? Params
  : never;
export type PluginFirstArg<Method extends keyof Plugin> = Required<Plugin>[Method] extends (
  ...args: infer Params
) => any
  ? Params[0]
  : never;

export interface Plugin {
  name: string;

  transformHeaders?: (
    args: {
      readonly method: Uppercase<string>;
      readonly target: URL;
      readonly headers: Headers;
    },
    storage: StorageManager
  ) => void | Promise<void>;

  transformJsonBody?: (
    args: {
      readonly method: Uppercase<string>;
      readonly target: URL;
      body: Record<string, any>;
    },
    storage: StorageManager
  ) => void | Promise<void>;
}
