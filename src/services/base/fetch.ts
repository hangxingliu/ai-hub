import { COLORS_ALL } from "../../utils/colors/index.ts";
import type { JSONSchema } from "../../utils/json-schema/schema-types.ts";
import { validateSchema } from "../../utils/json-schema/validator.ts";
import type { StorageManager } from "../../storage/index.ts";
import { getErrorMessage } from "../../utils/error.ts";
import { genHttpDiagnosis } from "../../utils/http-diagnosis.ts";
import { getRequestHeader } from "../../utils/http-headers.ts";
import { timeout } from "../../utils/timer.ts";

function printUpstreamFetch(url: URL, req: BunFetchRequestInit, reqFrom: number, res?: Response, error?: unknown) {
  const { RESET } = COLORS_ALL;
  const elapsedSec = (Date.now() - reqFrom) / 1000;
  const elapsed = `${COLORS_ALL.DIM}+${elapsedSec.toFixed(2)} s${RESET}`;

  let log = String(req.method || "GET").toUpperCase();
  log = (log === "GET" ? COLORS_ALL.GRAY_LIGHT : COLORS_ALL.GLOD) + log;
  log += ` ${url.pathname} [host=${url.host}}]${RESET}`;

  if (req.body) log += ` [with-body]`;

  const auth = getRequestHeader(req.headers, "Authorization") || getRequestHeader(req.headers, "x-api-key");
  if (auth) log += ` ${COLORS_ALL.BLUE_DARK}[with-auth]${RESET}`;
  if (req.proxy) log += ` ${COLORS_ALL.ORANGE_DARK}[proxy=${req.proxy}]${RESET}`;

  if (res) {
    let code = res.status.toString();
    if (!res.ok) code = COLORS_ALL.RED + code + RESET;
    log += ` -- ${elapsed} ${code}`;

    const val = res.headers.get("content-type");
    if (val) log += ` "${val}"`;
  } else if (error) {
    log += ` -- ${elapsed} ${COLORS_ALL.RED}ERR${RESET}`;
    log += `\n\`- ${COLORS_ALL.RED_LIGHT}${getErrorMessage(error)}${RESET}`;
  } else {
    log += ` -- ${COLORS_ALL.RED}???${RESET}`;
  }
  console.log(log);
}

export async function fetchUpstream(url: URL, req: BunFetchRequestInit, storage: StorageManager, allowNotOK = false) {
  const reqFrom = Date.now();

  const fallback = timeout(10 * 1000, () => printUpstreamFetch(url, req, reqFrom));

  let res: Response;
  try {
    res = await fetch(url, req);
  } catch (error) {
    fallback.abort();
    printUpstreamFetch(url, req, reqFrom, undefined, error);

    const diagnosis = await genHttpDiagnosis(url, req, undefined, error);
    storage.writeLogs("http-errors", diagnosis);
    throw error;
  }

  fallback.abort();
  printUpstreamFetch(url, req, reqFrom, res);

  if (!allowNotOK && !res.ok) {
    const diagnosis = await genHttpDiagnosis(url, req, res);
    storage.writeLogs("http-errors", diagnosis);
    throw new Error(`Invalid status code ${res.status} from "${url.hostname}"`);
  }
  return res;
}

export async function fetchUpstreamJSON<T>(
  url: URL,
  req: BunFetchRequestInit,
  storage: StorageManager,
  dataValidateFn?: ((data: T) => void | Promise<void>) | JSONSchema
): Promise<T> {
  const res = await fetchUpstream(url, req, storage);

  let jsonText: string;
  try {
    jsonText = await res.text();
  } catch (error) {
    const diagnosis = await genHttpDiagnosis(url, req, res, error);
    storage.writeLogs("http-errors", diagnosis);
    throw error;
  }

  let data: T;
  try {
    data = JSON.parse(jsonText);
  } catch {
    const err = new Error(`Invalid JSON string from ${url.host}${url.pathname}`);
    const diagnosis = await genHttpDiagnosis(url, req, res, err, jsonText);
    storage.writeLogs("http-errors", diagnosis);
    throw err;
  }

  if (dataValidateFn) {
    try {
      if (typeof dataValidateFn === "function") await dataValidateFn(data);
      else await validateSchema(data, dataValidateFn);
    } catch (err) {
      const diagnosis = await genHttpDiagnosis(url, req, res, err, data);
      storage.writeLogs("http-errors", diagnosis);
      throw new Error(`Invalid JSON schema from ${url.host}${url.pathname}: ${getErrorMessage(err)}`);
    }
  }

  return data;
}
