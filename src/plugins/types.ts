import { OpenAI } from "openai";
import type { StorageManager } from "../storage/index.ts";

export type PluginArgs<Method extends keyof PluginInstance> = Required<PluginInstance>[Method] extends (
  ...args: infer Params
) => any
  ? Params
  : never;

export type PluginFirstArg<Method extends keyof PluginInstance> = Required<PluginInstance>[Method] extends (
  ...args: infer Params
) => any
  ? Params[0]
  : never;

export type PluginStateStorage = Record<string, any>;
export type PluginConfigs = Record<string, any>;

type PromiseLike<T> = T | Promise<T>;
type PromiseLikeOrVoid<T> = PromiseLike<void> | PromiseLike<T>;

export type Plugin = PluginInitFn & { pluginName: string };

export type PluginInitFn = (args: { storage: StorageManager; configs: PluginConfigs }) => PromiseLike<PluginInstance>;

export type ResolvedPlugin = PluginInstance & { pluginName: string };

export interface PluginInstance {
  transformHeaders?: (args: {
    readonly method: Uppercase<string>;
    readonly target: URL;
    readonly headers: Headers;
    readonly state: PluginStateStorage;
  }) => PromiseLike<void>;

  transformJsonBody?: (args: {
    readonly method: Uppercase<string>;
    readonly target: URL;
    readonly state: PluginStateStorage;
    body: Record<string, any>;
  }) => PromiseLike<void>;

  /** @todo not implemented */
  transformStreamChunk?: (args: {
    readonly method: Uppercase<string>;
    readonly target: URL;
    readonly state: PluginStateStorage;
    chunks: OpenAI.ChatCompletionChunk[];
    done?: true;
  }) => PromiseLikeOrVoid<OpenAI.ChatCompletionChunk[]>;
}
