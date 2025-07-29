import type { Plugin } from "../api-types.ts";

import removeTelemetryHeaders from "./remove-telemetry-headers.ts";
import debugRequestMessages from "./debug-request-messages.ts";
import keepOnlyLastMessage from "./keep-only-last-message.ts";

export const DEFAULT_PLUGINS: ReadonlyArray<string> = [
  removeTelemetryHeaders.pluginName,
  debugRequestMessages.pluginName,
  keepOnlyLastMessage.pluginName,
];

export const BUILTIN_PLUGINS: ReadonlyArray<Plugin> = [
  //
  removeTelemetryHeaders,
  debugRequestMessages,
  keepOnlyLastMessage,
];

