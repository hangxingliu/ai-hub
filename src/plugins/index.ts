import type { Plugin } from "./types.js";

import removeTelemetryHeaders from "./builtin/remove-telemetry-headers.js";
import debugRequestMessages from "./builtin/debug-request-messages.js";
import keepOnlyLastMessage from "./builtin/keep-only-last-message.js";
import replaceMessages from "./builtin/replace-messages.js";
import disableModels from "./builtin/disable-models.js";
import rewriteModelId from "./builtin/rewrite-model-id.js";

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
