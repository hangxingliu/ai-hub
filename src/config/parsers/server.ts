import type { Config } from "../types.js";

export const DEFAULT_PORT = 8090;

export function getBunServerListenOptions(config: Config) {
  let listen: Omit<Bun.ServeOptions, "fetch"> | Omit<Bun.UnixServeOptions, "fetch">;
  let listenStr: string;
  if (typeof config.port !== "undefined" || typeof config.hostname !== "undefined") {
    listen = { port: config.port ?? DEFAULT_PORT, hostname: config.hostname };
    listenStr = `http://${config.hostname || "localhost"}:${listen.port}`;
  } else if (typeof config.unix_socket !== "undefined") {
    listen = { unix: config.unix_socket };
    listenStr = listen.unix;
  } else {
    listen = { port: DEFAULT_PORT, hostname: "127.0.0.1" };
    listenStr = `http://localhost:${listen.port}`;
  }
  return { options: listen, str: listenStr };
}
