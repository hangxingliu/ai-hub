import type { OpenAI } from "openai";

export class StreamEventV1Throttle {
  /** This index is `event.choices[].index` */
  private readonly prev: OpenAI.ChatCompletionChunk[] = [];

  constructor(private readonly handler: (event: OpenAI.ChatCompletionChunk) => void) {}

  push(_event: OpenAI.ChatCompletionChunk) {
    const events = StreamEventV1Throttle.splitEvent(_event);
    for (const event of events) {
      const choice = event.choices[0];
      if (!choice) {
        // the last message with usage info
        this.handler(event);
        continue;
      }

      const choiceIndex = choice.index;
      if (!Number.isSafeInteger(choiceIndex) || choiceIndex < 0) {
        console.warn(`Invalid choice.index ${choiceIndex}`);
        this.handler(event);
        continue;
      }

      const prev = this.prev[choiceIndex];
      if (!prev) {
        this.prev[choiceIndex] = event;
        continue;
      }

      const delta = choice.delta;
      const prevChoice = prev.choices[0];
      const prevDelta = prevChoice.delta;

      if (
        choice.finish_reason ||
        !delta ||
        delta.role !== prevDelta.role ||
        typeof delta.content !== typeof prevDelta.content
      ) {
        delete this.prev[choiceIndex];
        this.handler(prev);
        this.handler(event);
        continue;
      }

      if (delta.function_call || delta.tool_calls) {
        this.handler(event);
        continue;
      }

      // merge
      // 1. logprobs
      if (choice.logprobs && prevChoice.logprobs) {
        const { content, refusal } = choice.logprobs;
        const prev = prevChoice.logprobs;
        const prevContent = prev.content || [];
        const prevRefusal = prev.refusal || [];

        choice.logprobs.content = [...prevContent, ...(content || [])];
        if (prevRefusal.length > 0 || refusal) choice.logprobs.refusal = [...prevRefusal, ...(refusal || [])];
      }
      // 2. refusal
      if (delta.refusal || prevDelta.refusal) {
        delta.refusal = (prevDelta.refusal || "") + (delta.refusal || "");
      }
      // 3. content
      if (typeof prevDelta.content === "string") {
        delta.content = prevDelta.content + (delta.content || "");
      }
      this.prev[choiceIndex] = event;
      // end of for
    }
  }

  end() {
    this.prev.forEach((it) => {
      if (it) this.handler(it);
    });
  }

  static splitEvent(event: OpenAI.ChatCompletionChunk): OpenAI.ChatCompletionChunk[] {
    if (event.choices.length <= 1) return [event];

    const result: OpenAI.ChatCompletionChunk[] = [];
    for (const choice of event.choices) {
      result.push({ ...event, choices: [choice] });
    }
    return result;
  }
}
