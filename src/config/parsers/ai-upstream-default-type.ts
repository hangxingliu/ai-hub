import type { AIUpstreamType } from "../types.ts";
import { DEFAULT_UPSTREAMS } from "../zero-config/default-upstreams.const.ts";

function matchURL(url: URL, expectedURL: URL): boolean {
  if (url.hostname !== expectedURL.hostname) return false;
  if (url.pathname.replace(/\/?$/, "/").toLowerCase() !== expectedURL.pathname.replace(/\/?$/, "/").toLowerCase())
    return false;
  return true;
}

export function getDefaultAIUpstreamType(endpoint: URL): AIUpstreamType {
  for (const upstream of DEFAULT_UPSTREAMS) {
    if (upstream.type === "v1" || upstream.type === "ollama") continue;
    if (matchURL(endpoint, new URL(upstream.endpoint))) return upstream.type;
  }
  return "v1";
}
