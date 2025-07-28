function parseURL(url: string, varName: string): ParsedProxyEnvVar | undefined {
  const hasProtocol = /^\w+:\/\//.test(url);
  // add default protocol
  if (!hasProtocol) url = `http://${url}`;
  try {
    return { url: new URL(url), var: varName };
  } catch {
    // noop
  }
}

export type ParsedProxyEnvVar = { url: URL; var: string };
export type ParsedProxyEnvVars = { http?: ParsedProxyEnvVar; https?: ParsedProxyEnvVar; all?: ParsedProxyEnvVar };

export function parseProxyEnvVars(): ParsedProxyEnvVars {
  let http: ParsedProxyEnvVar | undefined;
  let https: ParsedProxyEnvVar | undefined;
  let all: ParsedProxyEnvVar | undefined;

  if (process.env.http_proxy) http = parseURL(process.env.http_proxy, "http_proxy");
  if (!http && process.env.HTTP_PROXY) http = parseURL(process.env.HTTP_PROXY, "HTTP_PROXY");

  if (process.env.https_proxy) https = parseURL(process.env.https_proxy, "https_proxy");
  if (!https && process.env.HTTPS_PROXY) https = parseURL(process.env.HTTPS_PROXY, "HTTPS_PROXY");

  if (process.env.all_proxy) all = parseURL(process.env.all_proxy, "all_proxy");
  if (!all && process.env.ALL_PROXY) all = parseURL(process.env.ALL_PROXY, "ALL_PROXY");

  // fallback
  if (!https) {
    if (all) https = all;
    else if (http) https = http;
  }
  if (!http) {
    if (all) http = all;
    else if (https) http = https;
  }
  return { http, https, all };
}
