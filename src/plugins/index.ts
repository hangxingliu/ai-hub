import type { Plugin } from "./types.ts";

import removeTelemetryHeaders from "./builtin/remove-telemetry-headers.ts";
import debugRequestMessages from "./builtin/debug-request-messages.ts";
import keepOnlyLastMessage from "./builtin/keep-only-last-message.ts";

export const DEFAULT_PLUGINS: ReadonlyArray<{ use: string }> = [
  { use: removeTelemetryHeaders.pluginName },
  { use: debugRequestMessages.pluginName },
  { use: keepOnlyLastMessage.pluginName },
];

export const BUILTIN_PLUGINS: ReadonlyArray<Plugin> = [
  //
  removeTelemetryHeaders,
  debugRequestMessages,
  keepOnlyLastMessage,
];
