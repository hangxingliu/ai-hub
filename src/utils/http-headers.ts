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
  audioExt?: "mp3" | "aac" | "flac" | "wav" | "pcm" | `opus` | `${string}.dat`;
};

export function parseContentType(contentType?: Headers | string | null): ParsedContentType {
  let args = "";
  const result: ParsedContentType = { raw: "" };
  if (contentType && contentType instanceof Headers) contentType = contentType.get("content-type");
  if (!contentType) return result;

  const index = contentType.indexOf(";");
  if (index >= 0) {
    contentType = contentType.slice(0, index);
    args = contentType.slice(index + 1);
  }

  const raw = contentType.toLowerCase();
  result.raw = raw;

  const audio = raw.match(/^audio\/(.+)$/);
  if (audio) {
    const type = audio[1].toLowerCase();
    if (type === "mpeg") result.audioExt = "mp3";
    else if (type === "aac" || type === "flac" || type === "opus" || type === "wav" || type === "pcm")
      result.audioExt = type;
    else result.audioExt = `${type.replace(/\W+/, "")}.dat`;
    return result;
  }

  if (contentType.endsWith("/event-stream")) result.isEventStream = true;
  else if (contentType.endsWith("/json")) result.isJSON = true;
  else if (contentType === "multipart/form-data") result.isFormData = true;
  return result;
}
