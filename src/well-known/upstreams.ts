export const WELL_KNOWN_UPSTREAMS = {
  /** https://platform.openai.com/docs/api-reference/introduction */
  openai: "https://api.openai.com/v1/",

  /** https://docs.x.ai/ */
  xai: "https://api.x.ai/v1/",

  /** https://docs.anthropic.com/en/api/overview */
  anthropic: "https://api.anthropic.com/v1/",

  /** https://ai.google.dev/gemini-api/docs */
  google: "https://generativelanguage.googleapis.com/v1beta/",

  /** https://ai.google.dev/gemini-api/docs/openai */
  google_compatible: "https://generativelanguage.googleapis.com/v1beta/openai/",

  /** https://ollama.readthedocs.io/en/api/ */
  ollama: "https://localhost:11434/api/",

  /** https://ollama.readthedocs.io/en/openai/ */
  ollama_compatible: "https://localhost:11434/v1/",
} satisfies Record<string, `https://${string}` | `http://${string}`>;
