import type { ParsedAIUpstream } from "../../config/parsers/ai-upstream.js";
import { COLORS_ALL } from "../../utils/colors/index.js";
import { getErrorMessage } from "../../utils/error.js";

export function printIncoming(route: string, method: string, url: string | URL, error?: string | Error) {
  let log = `-> [${route}] ${method} `;

  if (typeof url !== "string") url = url.pathname;
  else if (url.length > 128) url = url.slice(0, 128) + "...";
  log += url;

  if (error) log += " " + COLORS_ALL.RED + "Error: " + getErrorMessage(error) + COLORS_ALL.RESET;
  return console.log(log);
}

export function printIncomingForProxy(
  route: string,
  method: string,
  url: URL | string,
  error?: string | Error,
  modelId?: string,
  upstream?: ParsedAIUpstream,
  proxyURL?: URL,
  newURL?: URL
) {
  let log = `-> [${route}] ${method} `;

  if (typeof url !== "string") url = url.pathname;
  else if (url.length > 128) url = url.slice(0, 128) + "...";
  log += url;

  if (error) {
    log += " " + COLORS_ALL.RED + "Error: " + getErrorMessage(error) + COLORS_ALL.RESET;
    return console.log(log);
  }

  if (upstream) {
    if (proxyURL) log += ` ${COLORS_ALL.ORANGE_DARK}[proxy=${proxyURL.host}]${COLORS_ALL.RESET}`;
    if (modelId) log += ` - ${COLORS_ALL.CYAN_DARK}${modelId}${COLORS_ALL.RESET}`;
    log += ` -> ${upstream.name}`;
    if (newURL) log += ` ${COLORS_ALL.DIM}${newURL.pathname}${COLORS_ALL.RESET}`;
    return console.log(log);
  }

  if (modelId) log += ` - ${COLORS_ALL.CYAN_DARK}${modelId}${COLORS_ALL.RESET}`;
  log += ` -> ${COLORS_ALL.RED}404${COLORS_ALL.RESET}`;
  return console.log(log);
}
