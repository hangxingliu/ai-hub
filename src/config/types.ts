export type AIUpstreamType = "v1" | "anthropic" | "google" | "ollama" | "openai";

export interface AIUpstream {
  name: string;
  endpoint: string;
  default_api_key?: string;
  override_api_key?: string;
  proxy?: string;
  only_public_models?: boolean;
  type?: AIUpstreamType;
  api_version?: string;
  default_headers?: Record<string, string>;
}

export interface AIRequestRoute {
  name: string;
}

export interface AIRequestRouter {
  default: string;
  routes: AIRequestRoute[];
}

export interface Storage {
  baseDir: string;
}

export interface Config {
  port?: number;
  hostname?: string;
  unix_socket?: string;
  /** @deprecated Bun always respect system proxy in env vars. We don't have a way to disable it. */
  respect_system_proxy?: boolean;
  override_model_owned_by?: string;
  //
  storage: Storage;
  //
  upstreams: AIUpstream[];
  router: AIRequestRouter;
}
