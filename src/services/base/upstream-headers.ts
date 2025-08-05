import type { ParsedAIUpstream } from "../../config/parsers/ai-upstream.js";

const enum HeaderKeys {
  DEFAULT = "authorization",
  ANTHROPIC = "x-api-key",
}

function isNullAuth(auth?: string | null) {
  if (!auth) return true;
  // Bearer null
  // Bearer no
  if (/^\w+\s+(?:null|no)$/i.test(auth)) return true;
  if (/^null|no$/i.test(auth)) return true;
  return false;
}

/**
 * add default headers, auth headers, ...
 */
export function updateHeadersToUpstream(headers: Headers, upstream: ParsedAIUpstream, openaiCompatibility: boolean) {
  let authKey = HeaderKeys.DEFAULT;
  let authVal: string | undefined;

  if (!openaiCompatibility) {
    if (upstream.type === "anthropic") authKey = HeaderKeys.ANTHROPIC;
  }

  if (upstream.override_api_key) {
    authVal = upstream.override_api_key;
  } else {
    let auth: string | null;

    if (authKey !== HeaderKeys.DEFAULT) {
      auth = headers.get(HeaderKeys.DEFAULT);
      if (isNullAuth(auth)) headers.delete(HeaderKeys.DEFAULT);
    }

    auth = headers.get(authKey);
    if (isNullAuth(auth)) {
      headers.delete(authKey);
      if (upstream.default_api_key) authVal = upstream.default_api_key;
    }
  }

  if (authVal) {
    if (authKey === HeaderKeys.ANTHROPIC) {
      headers.set(authKey, authVal);
      headers.set("anthropic-version", upstream.api_version!);
    } else {
      headers.set(authKey, `Bearer ${authVal}`);
    }
  }

  // default headers
  for (const [key, value] of upstream.default_headers) {
    if (headers.has(key)) continue;
    headers.set(key, value);
  }
}
