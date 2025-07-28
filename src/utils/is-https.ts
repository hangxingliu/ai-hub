export function isHTTPS(url: Pick<URL, "protocol">) {
  return url.protocol === "https:" || url.protocol === "wss:";
}
