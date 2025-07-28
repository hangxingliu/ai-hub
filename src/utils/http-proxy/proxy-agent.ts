import type { Agent as HttpsAgent } from "https";
import type { Agent as HttpAgent } from "http";
import { HttpsProxyAgent, type HttpsProxyAgentOptions } from "https-proxy-agent";
import { HttpProxyAgent, type HttpProxyAgentOptions } from "http-proxy-agent";
import { SocksProxyAgent } from "socks-proxy-agent";

export function getProxyForHttps(
  url: URL | undefined | null,
  agentOpts?: HttpsProxyAgentOptions<string>
): HttpsAgent | undefined {
  if (!url) return;
  agentOpts = { keepAlive: true, ...agentOpts };

  if (url.protocol === "http:" || url.protocol === "https:") {
    url.protocol = "http:";
    if (url.username || url.password) {
      const auth = Buffer.from(url.username + ":" + url.password).toString("base64");
      let headers: any = {
        "Proxy-Authentication": "Basic " + auth,
      };
      if (agentOpts.headers) headers = { ...agentOpts.headers, ...headers };
      agentOpts.headers = headers;
    }
    return new HttpsProxyAgent(url, agentOpts) as HttpsAgent;
  } else if (url.protocol === "socks5:" || url.protocol === "socks:") {
    return new SocksProxyAgent(url, agentOpts) as HttpsAgent;
  }
}

export function getProxyForHttp(
  url: URL | undefined | null,
  agentOpts?: HttpProxyAgentOptions<string>
): HttpAgent | undefined {
  if (!url) return;
  agentOpts = { keepAlive: true, ...agentOpts };

  if (url.protocol === "http:" || url.protocol === "https:") {
    url.protocol = "http:";
    if (url.username || url.password) {
      const auth = Buffer.from(url.username + ":" + url.password).toString("base64");
      let headers: any = {
        "Proxy-Authentication": "Basic " + auth,
      };
      if (agentOpts.headers) headers = { ...agentOpts.headers, ...headers };
      agentOpts.headers = headers;
    }
    return new HttpProxyAgent(url, agentOpts) as HttpAgent;
  } else if (url.protocol === "socks5:" || url.protocol === "socks:") {
    return new SocksProxyAgent(url, agentOpts) as HttpAgent;
  }
}
