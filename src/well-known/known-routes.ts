import type { AIUpstreamType } from "../config/types.js";

export type KnownRouteInfo = {
  readonly [method in "GET" | "POST_ANY" | "POST_JSON" | "POST_FORM" | "PUT" | "DELETE"]?: Readonly<SingleRouteInfo>;
};

type SingleRouteInfo = [
  description: string,
  supportedRemoteType: AIUpstreamType,
  ...supportedRemoteTypes: AIUpstreamType[]
];

export type KnownRouteNames = keyof typeof ALL_KNOWN_ROUTES;

export const ALL_KNOWN_ROUTES = {
  //
  // audio
  //
  "/v1/audio/speech": { POST_JSON: ["Generates audio from the input text", "openai"] },
  "/v1/audio/transcriptions": { POST_FORM: ["Transcribes audio into the input language", "openai"] },
  "/v1/audio/translations": { POST_FORM: ["Translates audio into English", "openai"] },
  //
  // images
  //
  "/v1/images/generations": { POST_JSON: ["Creates an image given a prompt", "openai", "xai"] },
  "/v1/images/edits": {
    POST_JSON: ["Creates an edited or extended image given one or more source images and a prompt", "openai"],
  },
  "/v1/images/variations": { POST_JSON: ["Creates a variation of a given image", "openai"] },
  //
  // embeddings & tokenize
  //
  "/v1/embeddings": {
    POST_JSON: ["Creates an embedding vector representing the input text", "ollama", "openai", "google", "v1"],
  },
  "/v1/tokenize-text": { POST_JSON: ["Tokenize text with the specified model", "xai"] },

  //
  // evals
  //
  // TODO

  //
  // fine_tuning
  //
  // TODO

  //
  // response (new chat API)
  //
  "/v1/responses": {
    POST_JSON: ["Creates a model response. Provide text or image inputs to generate text or JSON outputs", "openai"],
  },
  "/v1/responses/:request_id": {
    GET: ["Retrieves a model response with the given ID", "openai"],
    DELETE: ["Deletes a model response with the given ID", "openai"],
  },
  "/v1/responses/:request_id/input_items": {
    GET: ["Returns a list of input items for a given response", "openai"],
  },
  "/v1/responses/:request_id/cancel": {
    POST_ANY: ["Cancels a model response with the given ID", "openai"],
  },

  //
  // chat
  //
  "/v1/chat/completions": {
    POST_JSON: [
      "Creates a model response for the given chat conversation",
      "ollama",
      "openai",
      "xai",
      "anthropic",
      "google",
      "v1",
    ],
    GET: ["List stored Chat Completions", "openai"],
  },
  "/v1/chat/completions/:request_id": {
    GET: ["Get a stored chat completion", "openai"],
    POST_JSON: ["Modify a stored chat completion", "openai"],
    DELETE: ["Delete a stored chat completion", "openai"],
  },
  "/v1/chat/completions/:request_id/messages": {
    POST_JSON: ["Get the messages in a stored chat completion", "openai"],
  },
  "/v1/chat/deferred-completion/:request_id": {
    GET: ["Tries to fetch a result for a previously-started deferred completion", "xai"],
  },
  //
  // models
  //
  "/v1/models": {
    GET: [
      "Lists the currently available models, and provides basic information about each one such as the owner and availability",
      "ollama",
      "openai",
      "xai",
      "anthropic",
      "google",
      "v1",
    ],
  },
  "/v1/models/:model_id": {
    GET: [
      "Retrieves a model instance, providing basic information about the model such as the owner and permissioning",
      "openai",
      "xai",
    ],
  },
  "/v1/language-models": {
    GET: [
      "List all chat and image understanding models available to the authenticating API key with full information. Additional information compared to /v1/models includes modalities, pricing, fingerprint and alias(es)",
      "xai",
    ],
  },
  "/v1/language-models/:model_id": {
    GET: ["Get full information about a chat or image understanding model with its model_id", "xai"],
  },
  "/v1/image-generation-models": {
    GET: [
      "List all image generation models available to the authenticating API key with full information. Additional information compared to /v1/models includes modalities, pricing, fingerprint and alias(es)",
      "xai",
    ],
  },
  "/v1/image-generation-models/:model_id": {
    GET: ["Get full information about an image generation model with its model_id", "xai"],
  },
} as const satisfies Record<string, KnownRouteInfo>;
