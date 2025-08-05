import { JSONSchemaBuilder } from "../utils/json-schema/schema-build.js";
import type { JSONSchema } from "../utils/json-schema/schema-types.js";

const { isStr, isStrEnum, isArr, isPort, isInt, isBool } = JSONSchemaBuilder;

export const aiUpstreamTypeSchemaEnum = ["v1", "anthropic", "google", "ollama", "openai"] as const;

export const aiUpstreamSchema = {
  type: "object",
  properties: {
    name: isStr(),
    endpoint: isStr(),
    default_api_key: isStr(),
    override_api_key: isStr(),
    proxy: isStr(),
    fallback: isBool("If enable this flag, the server will forward all unknown request to this upstream"),
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

export const storageSchema = {
  type: "object",
  properties: { baseDir: isStr({ default: "./storage" }) },
  required: ["baseDir"],
} satisfies JSONSchema;

export const pluginSchema = {
  type: "object",
  properties: {
    use: isStr("The name of the plugin or the path to the main file of the plugin"),
    configs: {
      type: "object",
      additionalProperties: true,
    },
  },
  required: ["use"],
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
    dump_request_logs: isBool(false, "Write request payload and response into log files"),
    max_request_body_size: {
      oneOf: [isInt(), isStr({ pattern: "\\d+(?:\\.\\d+)?(?:[kmgtKMGT][iI]?[bB]?)" })],
      default: "128MiB",
      description: "a size string (example: 12m, 128mib) or a int (default unit: bytes)",
    },
    //
    storage: storageSchema,
    //
    upstreams: isArr(aiUpstreamSchema),
    plugins: isArr(pluginSchema),
  },
  required: ["upstreams"],
} satisfies JSONSchema;
