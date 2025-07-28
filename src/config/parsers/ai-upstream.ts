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
    ];
  }

  return SHA256.hash(JSON.stringify(hashInput), "hex");
}

export function parseAIUpstream(_upstream: Readonly<AIUpstream>, env: Envsubst): ParsedAIUpstream {
  const upstream = { ..._upstream };
  upstream.endpoint = env.subst(upstream.endpoint);
  if (upstream.default_api_key) upstream.default_api_key = env.subst(upstream.default_api_key);
  if (upstream.proxy) upstream.proxy = env.subst(upstream.proxy);

  const hash = createAIUpstreamHash(upstream);
  const endpoint = new URL(upstream.endpoint);
  const type = upstream.type || "v1";
  if (type !== "v1") throw new Error(`The server only support 'v1' as the upstream type now`);

  return {
    hash,
    name: upstream.name,
    endpoint,
    default_api_key: upstream.default_api_key,
    override_api_key: upstream.override_api_key,
    proxy: upstream.proxy,
    only_public_models: upstream.only_public_models || false,
    type: upstream.type || "v1",
  };
}
