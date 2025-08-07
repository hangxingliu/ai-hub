import type { AIUpstream } from "../types.ts";

// https://stackoverflow.com/questions/41253310/typescript-retrieve-element-type-information-from-array-type
type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type DefaultUpstreamNames = ArrayElement<typeof DEFAULT_UPSTREAMS>["name"];

export const DEFAULT_UPSTREAMS = [
  {
    name: "xai",
    type: "xai",
    endpoint: "https://api.x.ai/v1",
    default_api_key: "${XAI_API_KEY}",
  },
  {
    name: "openai",
    type: "openai",
    endpoint: "https://api.openai.com/v1",
    default_api_key: "${OPENAI_API_KEY}",
  },
  {
    name: "anthropic",
    type: "anthropic",
    endpoint: "https://api.anthropic.com/v1",
    default_api_key: "${ANTHROPIC_API_KEY}",
    // https://docs.anthropic.com/en/api/versioning
    api_version: "2023-06-01",
  },
  {
    name: "deepseek",
    type: "v1",
    endpoint: "https://api.deepseek.com/v1",
    default_api_key: "${DEEPSEEK_API_KEY}",
  },
  {
    name: "google_compatible",
    type: "v1",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/openai",
    default_api_key: "${GEMINI_API_KEY}",
  },
  {
    name: "google",
    type: "google",
    endpoint: "https://generativelanguage.googleapis.com/v1beta",
    default_api_key: "${GEMINI_API_KEY}",
  },
  {
    name: "github",
    type: "v1",
    endpoint: "https://api.githubcopilot.com/v1",
    default_api_key: "${GITHUB_COPILOT_API_KEY}",
  },
  {
    name: "ollama",
    type: "ollama",
    endpoint: "http://127.0.0.1:11434/v1",
    fallback: true,
  },
] as const satisfies AIUpstream[];
