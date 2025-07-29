import { JSONSchemaBuilder } from "../utils/json-schema/schema-build.ts";
import type { JSONSchema } from "../utils/json-schema/schema-types.ts";

const { isStr, isStrEnum, isArr, isPort, isBool } = JSONSchemaBuilder;

export const aiUpstreamTypeSchemaEnum = ["v1", "anthropic", "google", "ollama", "openai"] as const;

export const aiUpstreamSchema = {
  type: "object",
  properties: {
    name: isStr(),
    endpoint: isStr(),
    default_api_key: isStr(),
    override_api_key: isStr(),
    proxy: isStr(),
    type: isStrEnum(aiUpstreamTypeSchemaEnum, {
      default: "v1",
      description:
        "AI upstream compatible type ('v1' represents this AI provider is compatibility with OpenAI v1 REST APIs. This is the default value)",
    }),
    only_public_models: isBool("List models without providing API keys"),
    api_version: isStr("For example: '2023-06-01' for Anthropic upstream"),
    default_headers: {
      type: "object",
      additionalProperties: { type: "string" },
      description: "Additional headers for requests to this upstream. they might be overwritten by the client",
    },
  },
  required: ["name", "endpoint"],
} satisfies JSONSchema;

export const aiRequestRouteSchema = {
  type: "object",
  properties: { name: isStr() },
  required: ["name"],
} satisfies JSONSchema;

export const aiRequestRouterSchema = {
  type: "object",
  properties: {
    default: isStr(),
    routes: isArr(aiRequestRouteSchema),
  },
  required: ["default"],
} satisfies JSONSchema;

export const storageSchema = {
  type: "object",
  properties: { baseDir: isStr({ default: "./storage" }) },
  required: ["baseDir"],
} satisfies JSONSchema;

export const configSchema = {
  type: "object",
  properties: {
    port: isPort("The port the server is listening on."),
    hostname: isStr("The hostname the server is listening on. Does not include the port."),
    unix_socket: isStr("If set, the HTTP server will listen on a unix socket instead of a port."),
    //
    respect_system_proxy: isBool(
      true,
      "[DEPRECATED] Bun always respect system proxy in env vars. We don't have a way to disable it.\nRespect https_proxy, HTTPS_PROXY and use them for requests by default"
    ),
    override_model_owned_by: isStr('Override "owned_by" in model list response'),
    //
    storage: storageSchema,
    //
    upstreams: isArr(aiUpstreamSchema),
    router: aiRequestRouterSchema,
  },
  required: ["upstreams", "router"],
} satisfies JSONSchema;
