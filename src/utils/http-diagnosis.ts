import { getErrorStack } from "./error.ts";
import { dumpHeaders } from "./http-headers.ts";
import { unit8ReadableStreamToBuffer } from "./stream-to-buffer.ts";

/** 1mb */
const MAX_BODY_SAMPLE_SIZE = 1 * 1024 * 1024;

export async function genHttpDiagnosis(
  url: URL | string,
  req: BunFetchRequestInit,
  res?: Response,
  error?: unknown,
  data?: any
) {
  try {
    if (!data && res && !res.bodyUsed) data = res.body;
    if (data) {
      if (typeof (data as ReadableStream).getReader === "function")
        data = (await unit8ReadableStreamToBuffer(data, MAX_BODY_SAMPLE_SIZE)).toString("base64");
      else if (Buffer.isBuffer(data)) data = data.subarray(0, MAX_BODY_SAMPLE_SIZE).toString("base64");
    }
  } catch (error) {
    console.error(error);
    // noop
  }
  return {
    method: req.method,
    url: url.toString(),
    status: res?.status,
    headers: dumpHeaders(req.headers),
    resHeaders: dumpHeaders(res?.headers),
    error: error ? getErrorStack(error) : undefined,
    data,
  };
}
