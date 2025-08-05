import { OpenAI } from "openai";
import type { StorageManager } from "../storage/index.ts";
import type { JSONSchema } from "../utils/json-schema/schema-types.ts";
import type { ParsedFormItem } from "../services/base/incoming-body-form-data.ts";

export type PluginInternalArgs = {
  kill: (statusCode?: number) => void;
};

export type PluginArgs<Method extends keyof PluginInstance> = Required<PluginInstance>[Method] extends (
  ...args: (infer Params)[]
) => any
  ? Omit<Params, keyof PluginInternalArgs>[]
  : never;

export type PluginFirstArg<Method extends keyof PluginInstance> = Required<PluginInstance>[Method] extends (
  firstArg: infer Params,
  ...args: any[]
) => any
  ? Omit<Params, keyof PluginInternalArgs>
  : never;

export type PluginStateStorage = Record<string, any>;

type PromiseLike<T> = T | Promise<T>;
type PromiseLikeOrVoid<T> = PromiseLike<void> | PromiseLike<T>;

export type Plugin<PluginConfigs = any> = PluginInitFn<PluginConfigs> & {
  pluginName: string;
  configSchema?: JSONSchema;
};

export type PluginInitFn<PluginConfigs = Record<string, any>> = (args: {
  storage: StorageManager;
  configs: PluginConfigs;
}) => PromiseLike<PluginInstance>;

export type ResolvedPlugin = PluginInstance & { pluginName: string };

export interface PluginInstance {
  /** a short message */
  initialized?: string;

  transformModelId?: (
    args: PluginInternalArgs & {
      readonly method: Uppercase<string>;
      /** incoming URL */
      readonly target: URL;
      /** incoming headers */
      readonly headers: Headers;
      readonly state: PluginStateStorage;
      /** default model id */
      modelId: string | undefined;
    }
  ) => PromiseLike<void>;

  transformHeaders?: (
    args: PluginInternalArgs & {
      readonly method: Uppercase<string>;
      readonly target: URL;
      readonly headers: Headers;
      readonly state: PluginStateStorage;
    }
  ) => PromiseLike<void>;

  transformJsonBody?: (
    args: PluginInternalArgs & {
      readonly method: Uppercase<string>;
      readonly target: URL;
      readonly state: PluginStateStorage;
      readonly modelId?: string;
      body: Record<string, any>;
    }
  ) => PromiseLike<void>;

  transformFormBody?: (
    args: PluginInternalArgs & {
      readonly method: Uppercase<string>;
      readonly target: URL;
      readonly state: PluginStateStorage;
      readonly modelId?: string;
      readonly body: ParsedFormItem[];
    }
  ) => PromiseLike<void>;

  /** @todo not implemented */
  transformStreamChunk?: (args: {
    readonly method: Uppercase<string>;
    readonly target: URL;
    readonly state: PluginStateStorage;
    chunks: OpenAI.ChatCompletionChunk[];
    done?: true;
  }) => PromiseLikeOrVoid<OpenAI.ChatCompletionChunk[]>;
}
