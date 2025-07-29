export function getRequestHeader(headers: Bun.HeadersInit | undefined, key: string): string | undefined {
  if (!headers) return;

  key = key.toLowerCase();
  if (Array.isArray(headers)) {
    for (const [headerKey, headerValue] of headers) if (headerKey.toLowerCase() === key) return headerValue;
    return;
  }

  if (typeof (headers as Headers).get === "function") {
    const value = (headers as Headers).get(key);
    return value ?? undefined;
  }

  for (const headerKey in headers) {
    if (headerKey.toLowerCase() !== key) continue;
    const v = (headers as any)[headerKey];
    return Array.isArray(v) ? v.join(";") : v;
  }
}

export function dumpHeaders(headers?: Bun.HeadersInit): Record<string, string> & { "set-cookie"?: string[] } {
  const result: Record<string, string> & { "set-cookie"?: string[] } = {};

  if (!headers) return result;
  if (Array.isArray(headers)) {
    for (const [headerKey, headerValue] of headers) {
      if (headerKey === "__proto__") continue;
      result[headerKey] = headerValue;
    }
    return result;
  }

  if (typeof (headers as Headers).get === "function") return (headers as Headers).toJSON();

  for (const headerKey in headers) {
    const v = (headers as any)[headerKey];
    result[headerKey] = Array.isArray(v) ? (headerKey.toLowerCase() === "set-cookie" ? v : v.join(";")) : v;
  }
  return result;
}

export type ParsedContentType = {
  isJSON?: true;
  isFormData?: true;
  isEventStream?: true;
  raw: string;
};

export function parseContentType(contentType?: Headers | string | null): ParsedContentType {
  let args = "";
  if (contentType && contentType instanceof Headers) contentType = contentType.get("content-type");
  if (!contentType) return { raw: "" };

  const index = contentType.indexOf(";");
  if (index >= 0) {
    contentType = contentType.slice(0, index);
    args = contentType.slice(index + 1);
  }

  const raw = contentType.toLowerCase();
  if (contentType.endsWith('/event-stream')) return { isEventStream: true, raw };
  if (contentType.endsWith("/json")) return { isJSON: true, raw };
  if (contentType === "multipart/form-data") return { isFormData: true, raw };
  return { raw };
}
