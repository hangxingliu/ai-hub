import type { Plugin } from "./types.ts";

import removeTelemetryHeaders from "./builtin/remove-telemetry-headers.ts";
import debugRequestMessages from "./builtin/debug-request-messages.ts";
import keepOnlyLastMessage from "./builtin/keep-only-last-message.ts";
import replaceMessages from "./builtin/replace-messages.ts";
import disableModels from "./builtin/disable-models.ts";
import rewriteModelId from "./builtin/rewrite-model-id.ts";

export const DEFAULT_PLUGINS: ReadonlyArray<{ use: string }> = [
  { use: removeTelemetryHeaders.pluginName },
  { use: debugRequestMessages.pluginName },
];

export const BUILTIN_PLUGINS: ReadonlyArray<Plugin> = [
  //
  removeTelemetryHeaders,
  debugRequestMessages,
  keepOnlyLastMessage,
  disableModels,
  replaceMessages,
  rewriteModelId,
];
