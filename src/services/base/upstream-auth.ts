import type { ParsedAIUpstream } from "../../config/parsers/ai-upstream.ts";

const HEADER_KEY = "authorization";

function isNullAuth(auth?: string | null) {
  if (!auth) return true;
  // Bearer null
  // Bearer no
  if (/^\w+\s+(?:null|no)$/i.test(auth)) return true;
  return false;
}

export function updateHeadersForUpstreamAuth(headers: Headers, upstream: ParsedAIUpstream) {
  if (upstream.override_api_key) return headers.set(HEADER_KEY, `Bearer ${upstream.override_api_key}`);

  const auth = headers.get(HEADER_KEY);
  if (isNullAuth(auth)) {
    if (upstream.default_api_key) return headers.set(HEADER_KEY, `Bearer ${upstream.default_api_key}`);
    return headers.delete(HEADER_KEY);
  }
}
