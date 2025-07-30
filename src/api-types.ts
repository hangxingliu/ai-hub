import { OpenAI } from "openai";

export type OpenAIModel = OpenAI.Model;
export type OpenAIModelWithUpstream = OpenAI.Model & { upstream: string };
export type OpenAIModelsResult = {
  object: "list";
  data: OpenAIModel[];
};

export type OpenAIChatParams = OpenAI.ChatCompletionCreateParams;
export type OpenAIChatMessages = OpenAI.ChatCompletionMessageParam[];

export type OpenAIChatCompletionChunk = OpenAI.ChatCompletionChunk;
