import { OpenAI } from "openai";

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

  transformHeaders?: (args: {
    readonly method: Uppercase<string>;
    readonly target: URL;
    readonly headers: Headers;
  }) => void | Promise<void>;

  transformJsonBody?: (args: {
    readonly method: Uppercase<string>;
    readonly target: URL;
    body: Record<string, any>;
  }) => void | Promise<void>;
}
