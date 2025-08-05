export type AIUpstreamType = "v1" | "anthropic" | "google" | "ollama" | "openai";

export interface AIUpstream {
  name: string;
  endpoint: string;
  default_api_key?: string;
  override_api_key?: string;
  fallback?: boolean;
  proxy?: string;
  only_public_models?: boolean;
  type?: AIUpstreamType;
  api_version?: string;
  default_headers?: Record<string, string>;
}

export interface Storage {
  baseDir: string;
}

export interface PluginInConfig {
  use: string;
  configs?: Record<string, any>;
}

export interface Config {
  port?: number;
  hostname?: string;
  unix_socket?: string;
  /** @deprecated Bun always respect system proxy in env vars. We don't have a way to disable it. */
  respect_system_proxy?: boolean;
  override_model_owned_by?: string;
  dump_request_logs?: boolean;
  max_request_body_size?: string | number;
  //
  storage: Storage;
  //
  upstreams: AIUpstream[];
  plugins: PluginInConfig[];
}
