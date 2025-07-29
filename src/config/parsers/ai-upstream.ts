import { SHA256 } from "bun";
import type { AIUpstream, AIUpstreamType } from "../types.ts";
import type { Envsubst } from "../../utils/envsubst.ts";

export type ParsedAIUpstream = {
  hash: string;
  //
  name: string;
  endpoint: URL;
  //
  default_api_key?: string;
  override_api_key?: string;
  proxy?: string;
  only_public_models: boolean;
  type: AIUpstreamType;
  api_version?: string;
  default_headers: [key: Lowercase<string>, value: string][];
};

export function createAIUpstreamHash(upstream: AIUpstream) {
  let hashInput: any = null;
  if (upstream) {
    hashInput = [
      upstream.name,
      upstream.type,
      upstream.endpoint ?? null,
      upstream.default_api_key ?? null,
      upstream.override_api_key ?? null,
      upstream.only_public_models || false,
      upstream.api_version || "",
      upstream.default_headers || {},
    ];
  }

  return SHA256.hash(JSON.stringify(hashInput), "hex");
}

export function parseAIUpstream(_upstream: Readonly<AIUpstream>, env: Envsubst): ParsedAIUpstream {
  const upstream = { ..._upstream };
  upstream.endpoint = env.subst(upstream.endpoint);
  if (upstream.default_api_key) upstream.default_api_key = env.subst(upstream.default_api_key);
  if (upstream.override_api_key) upstream.override_api_key = env.subst(upstream.override_api_key);
  if (upstream.proxy) upstream.proxy = env.subst(upstream.proxy);

  const hash = createAIUpstreamHash(upstream);
  const endpoint = new URL(upstream.endpoint);
  const type = upstream.type || "v1";

  const default_headers: ParsedAIUpstream["default_headers"] = [];
  if (upstream.default_headers)
    Object.entries(upstream.default_headers).forEach(([k, v]) => {
      if (!k) return;
      default_headers.push([k.toLowerCase() as Lowercase<string>, v]);
    });

  if (type === "anthropic" && !upstream.api_version) {
    // https://docs.anthropic.com/en/api/versioning
    upstream.api_version = "2023-06-01";
  }

  return {
    hash,
    name: upstream.name,
    endpoint,
    default_api_key: upstream.default_api_key,
    override_api_key: upstream.override_api_key,
    api_version: upstream.api_version,
    proxy: upstream.proxy,
    only_public_models: upstream.only_public_models || false,
    type,
    default_headers,
  };
}
