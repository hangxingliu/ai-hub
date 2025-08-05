import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";
import type { ParsedAIUpstream } from "../config/parsers/ai-upstream.js";
import type { LoadedConfig } from "../config/loader.js";
import { getProxyForHttp, getProxyForHttps } from "../utils/http-proxy/proxy-agent.js";
// import { parseProxyEnvVars } from "../utils/http-proxy/env.js";
import { isHTTPS } from "../utils/is-https.js";

type Agent = HttpAgent | HttpsAgent;

export class ProxyAgents {
  private readonly created = new Map<string, { agent: Agent; url?: URL }>();
  constructor(private readonly config: LoadedConfig) {}

  get(upstream: ParsedAIUpstream) {
    const created = this.created.get(upstream.name);
    if (created) return created;

    let agent: Agent | undefined;
    let url: URL | undefined;
    const https = isHTTPS(upstream.endpoint);

    if (upstream.proxy) {
      url = new URL(upstream.proxy);
      agent = https ? getProxyForHttps(url) : getProxyForHttp(url);
      if (!agent) url = undefined;
    }
    // Bun always respect system env vars about proxy
    // else if (this.config.respect_system_proxy) {
    //   const env = parseProxyEnvVars();
    //   if (https) agent = getProxyForHttps((url = env.https?.url || env.all?.url));
    //   else agent = getProxyForHttps((url = env.http?.url || env.all?.url));

    //   if (!agent) url = undefined;
    // }
    if (!agent) agent = https ? new HttpsAgent() : new HttpAgent();
    this.created.set(upstream.name, { agent, url });
    return { agent, url };
  }

  clear() {
    this.created.forEach((it) => it.agent.destroy());
    this.created.clear();
  }
}
