export function resolveUpstreamURL(endpoint: URL, uri: string) {
  const url = new URL(endpoint);
  const pathName = (url.pathname || "").replace(/\/$/, "") + uri.replace(/^\/?/, "/");
  url.pathname = pathName;
  return url;
}
