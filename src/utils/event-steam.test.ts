import type {OpenAI} from "openai";
import { StreamEventV1Throttle } from "./event-stream.js";

function test() {
  const count = { all: 0, merged: 0 };
  const throttle = new StreamEventV1Throttle(it => {
    count.merged++;
    console.log(it.choices[0])
  });

  for (const item of exampleData) {
    count.all++;
    throttle.push(item);
  }
  throttle.end();

  console.log(count);
}

const exampleData: OpenAI.ChatCompletionChunk[] = [
  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { role: "assistant", content: "", refusal: null },
        logprobs: { content: [], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: '"""\n' },
        logprobs: {
          content: [{ token: '"""\n', logprob: -0.08556527644395828, bytes: [34, 34, 34, 10], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "You" },
        logprobs: {
          content: [{ token: "You", logprob: -0.011767575517296791, bytes: [89, 111, 117], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " are" },
        logprobs: {
          content: [{ token: " are", logprob: -0.00002963691804325208, bytes: [32, 97, 114, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { role: "assistant", content: "", refusal: null },
        logprobs: { content: [], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: '"""\n' },
        logprobs: {
          content: [{ token: '"""\n', logprob: -0.08514867722988129, bytes: [34, 34, 34, 10], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " responsible" },
        logprobs: {
          content: [
            {
              token: " responsible",
              logprob: -0.008970136754214764,
              bytes: [32, 114, 101, 115, 112, 111, 110, 115, 105, 98, 108, 101],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "You" },
        logprobs: {
          content: [{ token: "You", logprob: -0.011694289743900299, bytes: [89, 111, 117], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " for" },
        logprobs: {
          content: [{ token: " for", logprob: 0.0, bytes: [32, 102, 111, 114], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " are" },
        logprobs: {
          content: [{ token: " are", logprob: -0.00003333223139634356, bytes: [32, 97, 114, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " adding" },
        logprobs: {
          content: [
            {
              token: " adding",
              logprob: -0.00026634239475242794,
              bytes: [32, 97, 100, 100, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " responsible" },
        logprobs: {
          content: [
            {
              token: " responsible",
              logprob: -0.008970136754214764,
              bytes: [32, 114, 101, 115, 112, 111, 110, 115, 105, 98, 108, 101],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " comments" },
        logprobs: {
          content: [
            {
              token: " comments",
              logprob: -0.000015332478142227046,
              bytes: [32, 99, 111, 109, 109, 101, 110, 116, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " for" },
        logprobs: {
          content: [{ token: " for", logprob: 0.0, bytes: [32, 102, 111, 114], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " to" },
        logprobs: {
          content: [{ token: " to", logprob: -0.061975300312042236, bytes: [32, 116, 111], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " adding" },
        logprobs: {
          content: [
            {
              token: " adding",
              logprob: -0.00021295747137628496,
              bytes: [32, 97, 100, 100, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: -0.000344640837283805, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " comments" },
        logprobs: {
          content: [
            {
              token: " comments",
              logprob: -0.000015332478142227046,
              bytes: [32, 99, 111, 109, 109, 101, 110, 116, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " given" },
        logprobs: {
          content: [
            { token: " given", logprob: -0.3868970274925232, bytes: [32, 103, 105, 118, 101, 110], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " to" },
        logprobs: {
          content: [{ token: " to", logprob: -0.05488995462656021, bytes: [32, 116, 111], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " code" },
        logprobs: {
          content: [{ token: " code", logprob: 0.0, bytes: [32, 99, 111, 100, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: -0.00038932388997636735, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " and" },
        logprobs: {
          content: [{ token: " and", logprob: -0.0012516580754891038, bytes: [32, 97, 110, 100], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " given" },
        logprobs: {
          content: [
            { token: " given", logprob: -0.38689929246902466, bytes: [32, 103, 105, 118, 101, 110], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " optimizing" },
        logprobs: {
          content: [
            {
              token: " optimizing",
              logprob: -0.01115428376942873,
              bytes: [32, 111, 112, 116, 105, 109, 105, 122, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " code" },
        logprobs: {
          content: [{ token: " code", logprob: 0.0, bytes: [32, 99, 111, 100, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: -0.1262815147638321, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " and" },
        logprobs: {
          content: [{ token: " and", logprob: -0.0011099707335233688, bytes: [32, 97, 110, 100], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " naming" },
        logprobs: {
          content: [
            {
              token: " naming",
              logprob: -0.011990458704531193,
              bytes: [32, 110, 97, 109, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " optimizing" },
        logprobs: {
          content: [
            {
              token: " optimizing",
              logprob: -0.011150632053613663,
              bytes: [32, 111, 112, 116, 105, 109, 105, 122, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " within" },
        logprobs: {
          content: [
            {
              token: " within",
              logprob: -0.8486163020133972,
              bytes: [32, 119, 105, 116, 104, 105, 110],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: -0.13694044947624207, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: -0.008681111969053745, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " naming" },
        logprobs: {
          content: [
            {
              token: " naming",
              logprob: -0.012113071978092194,
              bytes: [32, 110, 97, 109, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " code" },
        logprobs: {
          content: [
            { token: " code", logprob: -2.2200749754119897e-6, bytes: [32, 99, 111, 100, 101], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " within" },
        logprobs: {
          content: [
            {
              token: " within",
              logprob: -0.8474160432815552,
              bytes: [32, 119, 105, 116, 104, 105, 110],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " according" },
        logprobs: {
          content: [
            {
              token: " according",
              logprob: -0.081367127597332,
              bytes: [32, 97, 99, 99, 111, 114, 100, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: -0.006790801417082548, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " to" },
        logprobs: { content: [{ token: " to", logprob: 0.0, bytes: [32, 116, 111], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " code" },
        logprobs: {
          content: [
            { token: " code", logprob: -1.981667537620524e-6, bytes: [32, 99, 111, 100, 101], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: -7.896309739408025e-7, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " according" },
        logprobs: {
          content: [
            {
              token: " according",
              logprob: -0.08090733736753464,
              bytes: [32, 97, 99, 99, 111, 114, 100, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " following" },
        logprobs: {
          content: [
            {
              token: " following",
              logprob: -0.023403992876410484,
              bytes: [32, 102, 111, 108, 108, 111, 119, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " to" },
        logprobs: { content: [{ token: " to", logprob: 0.0, bytes: [32, 116, 111], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " requirements" },
        logprobs: {
          content: [
            {
              token: " requirements",
              logprob: -0.0015059324214234948,
              bytes: [32, 114, 101, 113, 117, 105, 114, 101, 109, 101, 110, 116, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: -6.704273118884885e-7, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: ":\n\n" },
        logprobs: {
          content: [{ token: ":\n\n", logprob: -0.00007624555291840807, bytes: [58, 10, 10], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " following" },
        logprobs: {
          content: [
            {
              token: " following",
              logprob: -0.01825530268251896,
              bytes: [32, 102, 111, 108, 108, 111, 119, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "1" },
        logprobs: { content: [{ token: "1", logprob: 0.0, bytes: [49], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " requirements" },
        logprobs: {
          content: [
            {
              token: " requirements",
              logprob: -0.0011670070234686136,
              bytes: [32, 114, 101, 113, 117, 105, 114, 101, 109, 101, 110, 116, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "." },
        logprobs: { content: [{ token: ".", logprob: 0.0, bytes: [46], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: ":\n\n" },
        logprobs: {
          content: [{ token: ":\n\n", logprob: -0.00005931863051955588, bytes: [58, 10, 10], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " If" },
        logprobs: {
          content: [{ token: " If", logprob: -0.000014617256056226324, bytes: [32, 73, 102], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "1" },
        logprobs: { content: [{ token: "1", logprob: 0.0, bytes: [49], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: 0.0, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "." },
        logprobs: { content: [{ token: ".", logprob: 0.0, bytes: [46], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " given" },
        logprobs: {
          content: [
            { token: " given", logprob: -0.7123764157295227, bytes: [32, 103, 105, 118, 101, 110], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " If" },
        logprobs: {
          content: [{ token: " If", logprob: -0.000018670179997570813, bytes: [32, 73, 102], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " code" },
        logprobs: {
          content: [{ token: " code", logprob: 0.0, bytes: [32, 99, 111, 100, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: 0.0, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " is" },
        logprobs: {
          content: [{ token: " is", logprob: -1.9361264946837764e-7, bytes: [32, 105, 115], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " provided" },
        logprobs: {
          content: [
            {
              token: " provided",
              logprob: -0.7123764157295227,
              bytes: [32, 112, 114, 111, 118, 105, 100, 101, 100],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " Type" },
        logprobs: {
          content: [{ token: " Type", logprob: -0.3920547664165497, bytes: [32, 84, 121, 112, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " code" },
        logprobs: {
          content: [{ token: " code", logprob: 0.0, bytes: [32, 99, 111, 100, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "Script" },
        logprobs: {
          content: [{ token: "Script", logprob: 0.0, bytes: [83, 99, 114, 105, 112, 116], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " is" },
        logprobs: {
          content: [{ token: " is", logprob: -1.9361264946837764e-7, bytes: [32, 105, 115], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "/" },
        logprobs: {
          content: [{ token: "/", logprob: -0.029769469052553177, bytes: [47], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " Type" },
        logprobs: {
          content: [{ token: " Type", logprob: -0.8361915946006775, bytes: [32, 84, 121, 112, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "Java" },
        logprobs: {
          content: [{ token: "Java", logprob: -1.0280383548888494e-6, bytes: [74, 97, 118, 97], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "Script" },
        logprobs: {
          content: [{ token: "Script", logprob: 0.0, bytes: [83, 99, 114, 105, 112, 116], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "Script" },
        logprobs: {
          content: [{ token: "Script", logprob: 0.0, bytes: [83, 99, 114, 105, 112, 116], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "/" },
        logprobs: {
          content: [{ token: "/", logprob: -0.029767265543341637, bytes: [47], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "," },
        logprobs: { content: [{ token: ",", logprob: 0.0, bytes: [44], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "Java" },
        logprobs: {
          content: [{ token: "Java", logprob: -1.0280383548888494e-6, bytes: [74, 97, 118, 97], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " please" },
        logprobs: {
          content: [
            {
              token: " please",
              logprob: -0.8187006115913391,
              bytes: [32, 112, 108, 101, 97, 115, 101],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "Script" },
        logprobs: {
          content: [{ token: "Script", logprob: 0.0, bytes: [83, 99, 114, 105, 112, 116], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " use" },
        logprobs: {
          content: [{ token: " use", logprob: -0.03164630010724068, bytes: [32, 117, 115, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "," },
        logprobs: { content: [{ token: ",", logprob: 0.0, bytes: [44], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: -0.06914679706096649, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " please" },
        logprobs: {
          content: [
            {
              token: " please",
              logprob: -0.6191548705101013,
              bytes: [32, 112, 108, 101, 97, 115, 101],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " js" },
        logprobs: {
          content: [{ token: " js", logprob: -0.0638679638504982, bytes: [32, 106, 115], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " use" },
        logprobs: {
          content: [{ token: " use", logprob: -0.029569502919912338, bytes: [32, 117, 115, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "Doc" },
        logprobs: {
          content: [{ token: "Doc", logprob: -0.000010564331205387134, bytes: [68, 111, 99], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: -0.07096654921770096, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " comment" },
        logprobs: {
          content: [
            {
              token: " comment",
              logprob: -0.48291298747062683,
              bytes: [32, 99, 111, 109, 109, 101, 110, 116],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " js" },
        logprobs: {
          content: [{ token: " js", logprob: -0.06387612223625183, bytes: [32, 106, 115], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " style" },
        logprobs: {
          content: [
            {
              token: " style",
              logprob: -5.5577775128767826e-6,
              bytes: [32, 115, 116, 121, 108, 101],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "Doc" },
        logprobs: {
          content: [{ token: "Doc", logprob: -8.2994620242971e-6, bytes: [68, 111, 99], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " wherever" },
        logprobs: {
          content: [
            {
              token: " wherever",
              logprob: -2.49069881439209,
              bytes: [32, 119, 104, 101, 114, 101, 118, 101, 114],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " comment" },
        logprobs: {
          content: [
            {
              token: " comment",
              logprob: -0.4829188883304596,
              bytes: [32, 99, 111, 109, 109, 101, 110, 116],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " possible" },
        logprobs: {
          content: [
            {
              token: " possible",
              logprob: -0.02071891725063324,
              bytes: [32, 112, 111, 115, 115, 105, 98, 108, 101],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " style" },
        logprobs: {
          content: [
            { token: " style", logprob: -6.392202976712724e-6, bytes: [32, 115, 116, 121, 108, 101], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: ".\n" },
        logprobs: {
          content: [{ token: ".\n", logprob: -0.0011706985533237457, bytes: [46, 10], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " whenever" },
        logprobs: {
          content: [
            {
              token: " whenever",
              logprob: -0.7829592823982239,
              bytes: [32, 119, 104, 101, 110, 101, 118, 101, 114],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "2" },
        logprobs: {
          content: [{ token: "2", logprob: -1.9361264946837764e-7, bytes: [50], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " possible" },
        logprobs: {
          content: [
            {
              token: " possible",
              logprob: -0.0007407767116092145,
              bytes: [32, 112, 111, 115, 115, 105, 98, 108, 101],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "." },
        logprobs: { content: [{ token: ".", logprob: 0.0, bytes: [46], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: ".\n" },
        logprobs: {
          content: [{ token: ".\n", logprob: -0.0009120595059357584, bytes: [46, 10], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " Avoid" },
        logprobs: {
          content: [
            { token: " Avoid", logprob: -4.186358451843262, bytes: [32, 65, 118, 111, 105, 100], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "2" },
        logprobs: {
          content: [{ token: "2", logprob: -1.9361264946837764e-7, bytes: [50], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " adding" },
        logprobs: {
          content: [
            {
              token: " adding",
              logprob: -0.000052524021157296374,
              bytes: [32, 97, 100, 100, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "." },
        logprobs: { content: [{ token: ".", logprob: 0.0, bytes: [46], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " additional" },
        logprobs: {
          content: [
            {
              token: " additional",
              logprob: -2.5823144912719727,
              bytes: [32, 97, 100, 100, 105, 116, 105, 111, 110, 97, 108],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " There" },
        logprobs: {
          content: [
            { token: " There", logprob: -0.7907383441925049, bytes: [32, 84, 104, 101, 114, 101], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " comments" },
        logprobs: {
          content: [
            {
              token: " comments",
              logprob: -0.00003190178904333152,
              bytes: [32, 99, 111, 109, 109, 101, 110, 116, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " is" },
        logprobs: {
          content: [{ token: " is", logprob: -0.0017032715259119868, bytes: [32, 105, 115], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " for" },
        logprobs: {
          content: [{ token: " for", logprob: -0.07913146167993546, bytes: [32, 102, 111, 114], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " no" },
        logprobs: { content: [{ token: " no", logprob: 0.0, bytes: [32, 110, 111], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " variables" },
        logprobs: {
          content: [
            {
              token: " variables",
              logprob: -0.15019431710243225,
              bytes: [32, 118, 97, 114, 105, 97, 98, 108, 101, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " need" },
        logprobs: {
          content: [{ token: " need", logprob: 0.0, bytes: [32, 110, 101, 101, 100], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "/functions" },
        logprobs: {
          content: [
            {
              token: "/functions",
              logprob: -0.10021582990884781,
              bytes: [47, 102, 117, 110, 99, 116, 105, 111, 110, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " to" },
        logprobs: {
          content: [{ token: " to", logprob: -4.842555426876061e-6, bytes: [32, 116, 111], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "/" },
        logprobs: {
          content: [{ token: "/", logprob: -0.023537667468190193, bytes: [47], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " add" },
        logprobs: {
          content: [{ token: " add", logprob: -0.0001319063303526491, bytes: [32, 97, 100, 100], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "logic" },
        logprobs: {
          content: [
            { token: "logic", logprob: -5.438573680294212e-6, bytes: [108, 111, 103, 105, 99], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " extra" },
        logprobs: {
          content: [
            { token: " extra", logprob: -0.25231504440307617, bytes: [32, 101, 120, 116, 114, 97], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " that" },
        logprobs: {
          content: [
            { token: " that", logprob: -1.6240566083070007e-6, bytes: [32, 116, 104, 97, 116], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " comments" },
        logprobs: {
          content: [
            {
              token: " comments",
              logprob: -0.00004084206375409849,
              bytes: [32, 99, 111, 109, 109, 101, 110, 116, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " are" },
        logprobs: {
          content: [{ token: " are", logprob: -0.0019291093340143561, bytes: [32, 97, 114, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " for" },
        logprobs: {
          content: [{ token: " for", logprob: -0.023400383070111275, bytes: [32, 102, 111, 114], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " self" },
        logprobs: {
          content: [
            { token: " self", logprob: -0.10418757051229477, bytes: [32, 115, 101, 108, 102], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " variables" },
        logprobs: {
          content: [
            {
              token: " variables",
              logprob: -0.11620807647705078,
              bytes: [32, 118, 97, 114, 105, 97, 98, 108, 101, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "-ex" },
        logprobs: {
          content: [{ token: "-ex", logprob: -0.006717267446219921, bytes: [45, 101, 120], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "/functions" },
        logprobs: {
          content: [
            {
              token: "/functions",
              logprob: -0.038051363080739975,
              bytes: [47, 102, 117, 110, 99, 116, 105, 111, 110, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "plan" },
        logprobs: {
          content: [{ token: "plan", logprob: -2.5776860184123507e-6, bytes: [112, 108, 97, 110], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "/" },
        logprobs: {
          content: [{ token: "/", logprob: -0.02341492846608162, bytes: [47], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "atory" },
        logprobs: {
          content: [{ token: "atory", logprob: 0.0, bytes: [97, 116, 111, 114, 121], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "logic" },
        logprobs: {
          content: [
            { token: "logic", logprob: -6.153795766294934e-6, bytes: [108, 111, 103, 105, 99], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " (" },
        logprobs: {
          content: [{ token: " (", logprob: -0.07921219617128372, bytes: [32, 40], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " that" },
        logprobs: {
          content: [
            { token: " that", logprob: -9.088346359931165e-7, bytes: [32, 116, 104, 97, 116], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "too" },
        logprobs: {
          content: [{ token: "too", logprob: -0.3515857458114624, bytes: [116, 111, 111], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " are" },
        logprobs: {
          content: [{ token: " are", logprob: -0.002476016292348504, bytes: [32, 97, 114, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " simple" },
        logprobs: {
          content: [
            {
              token: " simple",
              logprob: -0.003096785396337509,
              bytes: [32, 115, 105, 109, 112, 108, 101],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " self" },
        logprobs: {
          content: [
            { token: " self", logprob: -0.12584981322288513, bytes: [32, 115, 101, 108, 102], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " or" },
        logprobs: {
          content: [{ token: " or", logprob: -0.0036816708743572235, bytes: [32, 111, 114], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "-ex" },
        logprobs: {
          content: [{ token: "-ex", logprob: -0.014164921827614307, bytes: [45, 101, 120], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " understandable" },
        logprobs: {
          content: [
            {
              token: " understandable",
              logprob: -0.39160990715026855,
              bytes: [32, 117, 110, 100, 101, 114, 115, 116, 97, 110, 100, 97, 98, 108, 101],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "plan" },
        logprobs: {
          content: [{ token: "plan", logprob: -2.816093228830141e-6, bytes: [112, 108, 97, 110], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " through" },
        logprobs: {
          content: [
            {
              token: " through",
              logprob: -0.02085833251476288,
              bytes: [32, 116, 104, 114, 111, 117, 103, 104],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "atory" },
        logprobs: {
          content: [{ token: "atory", logprob: 0.0, bytes: [97, 116, 111, 114, 121], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " naming" },
        logprobs: {
          content: [
            {
              token: " naming",
              logprob: -0.0712987408041954,
              bytes: [32, 110, 97, 109, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " (" },
        logprobs: {
          content: [{ token: " (", logprob: -0.02337067946791649, bytes: [32, 40], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " alone" },
        logprobs: {
          content: [
            { token: " alone", logprob: -0.25215229392051697, bytes: [32, 97, 108, 111, 110, 101], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "too" },
        logprobs: {
          content: [{ token: "too", logprob: -0.2679789960384369, bytes: [116, 111, 111], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: ").\n" },
        logprobs: {
          content: [{ token: ").\n", logprob: -0.00020509003661572933, bytes: [41, 46, 10], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " simple" },
        logprobs: {
          content: [
            {
              token: " simple",
              logprob: -0.003094647079706192,
              bytes: [32, 115, 105, 109, 112, 108, 101],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "3" },
        logprobs: { content: [{ token: "3", logprob: 0.0, bytes: [51], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " or" },
        logprobs: {
          content: [{ token: " or", logprob: -0.004693088121712208, bytes: [32, 111, 114], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "." },
        logprobs: { content: [{ token: ".", logprob: 0.0, bytes: [46], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " understandable" },
        logprobs: {
          content: [
            {
              token: " understandable",
              logprob: -0.3750368356704712,
              bytes: [32, 117, 110, 100, 101, 114, 115, 116, 97, 110, 100, 97, 98, 108, 101],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " Do" },
        logprobs: {
          content: [{ token: " Do", logprob: -0.011583770625293255, bytes: [32, 68, 111], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " through" },
        logprobs: {
          content: [
            {
              token: " through",
              logprob: -0.019024036824703217,
              bytes: [32, 116, 104, 114, 111, 117, 103, 104],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " not" },
        logprobs: {
          content: [{ token: " not", logprob: -1.9361264946837764e-7, bytes: [32, 110, 111, 116], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " naming" },
        logprobs: {
          content: [
            {
              token: " naming",
              logprob: -0.04969743266701698,
              bytes: [32, 110, 97, 109, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " merely" },
        logprobs: {
          content: [
            {
              token: " merely",
              logprob: -1.081880807876587,
              bytes: [32, 109, 101, 114, 101, 108, 121],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " alone" },
        logprobs: {
          content: [
            { token: " alone", logprob: -0.31342291831970215, bytes: [32, 97, 108, 111, 110, 101], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " explain" },
        logprobs: {
          content: [
            {
              token: " explain",
              logprob: -0.04041638970375061,
              bytes: [32, 101, 120, 112, 108, 97, 105, 110],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: ").\n" },
        logprobs: {
          content: [{ token: ").\n", logprob: -0.0002043748099822551, bytes: [41, 46, 10], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " straightforward" },
        logprobs: {
          content: [
            {
              token: " straightforward",
              logprob: -0.014421462081372738,
              bytes: [32, 115, 116, 114, 97, 105, 103, 104, 116, 102, 111, 114, 119, 97, 114, 100],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "3" },
        logprobs: { content: [{ token: "3", logprob: 0.0, bytes: [51], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " code" },
        logprobs: {
          content: [
            { token: " code", logprob: -0.004287215415388346, bytes: [32, 99, 111, 100, 101], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "." },
        logprobs: { content: [{ token: ".", logprob: 0.0, bytes: [46], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " logic" },
        logprobs: {
          content: [
            { token: " logic", logprob: -4.36574100604048e-6, bytes: [32, 108, 111, 103, 105, 99], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " Do" },
        logprobs: {
          content: [{ token: " Do", logprob: -0.5390740036964417, bytes: [32, 68, 111], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " through" },
        logprobs: {
          content: [
            {
              token: " through",
              logprob: -0.10736815631389618,
              bytes: [32, 116, 104, 114, 111, 117, 103, 104],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " not" },
        logprobs: {
          content: [{ token: " not", logprob: 0.0, bytes: [32, 110, 111, 116], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " comments" },
        logprobs: {
          content: [
            {
              token: " comments",
              logprob: -0.000023319124011322856,
              bytes: [32, 99, 111, 109, 109, 101, 110, 116, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " simply" },
        logprobs: {
          content: [
            {
              token: " simply",
              logprob: -0.5273160934448242,
              bytes: [32, 115, 105, 109, 112, 108, 121],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: ";" },
        logprobs: {
          content: [{ token: ";", logprob: -0.012796267867088318, bytes: [59], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " explain" },
        logprobs: {
          content: [
            {
              token: " explain",
              logprob: -0.03950648009777069,
              bytes: [32, 101, 120, 112, 108, 97, 105, 110],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " instead" },
        logprobs: {
          content: [
            {
              token: " instead",
              logprob: -0.32452309131622314,
              bytes: [32, 105, 110, 115, 116, 101, 97, 100],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " straightforward" },
        logprobs: {
          content: [
            {
              token: " straightforward",
              logprob: -0.0361461378633976,
              bytes: [32, 115, 116, 114, 97, 105, 103, 104, 116, 102, 111, 114, 119, 97, 114, 100],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: "," },
        logprobs: {
          content: [{ token: ",", logprob: -1.9361264946837764e-7, bytes: [44], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " code" },
        logprobs: {
          content: [
            { token: " code", logprob: -0.004853022750467062, bytes: [32, 99, 111, 100, 101], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " provide" },
        logprobs: {
          content: [
            {
              token: " provide",
              logprob: -0.2768746614456177,
              bytes: [32, 112, 114, 111, 118, 105, 100, 101],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " logic" },
        logprobs: {
          content: [
            { token: " logic", logprob: -5.676981345459353e-6, bytes: [32, 108, 111, 103, 105, 99], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " insights" },
        logprobs: {
          content: [
            {
              token: " insights",
              logprob: -0.1749071180820465,
              bytes: [32, 105, 110, 115, 105, 103, 104, 116, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " through" },
        logprobs: {
          content: [
            {
              token: " through",
              logprob: -0.09462283551692963,
              bytes: [32, 116, 104, 114, 111, 117, 103, 104],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " into" },
        logprobs: {
          content: [
            { token: " into", logprob: -0.019470613449811935, bytes: [32, 105, 110, 116, 111], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " comments" },
        logprobs: {
          content: [
            {
              token: " comments",
              logprob: -0.000022246291337069124,
              bytes: [32, 99, 111, 109, 109, 101, 110, 116, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: -0.000049424725148128346, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: ";" },
        logprobs: {
          content: [{ token: ";", logprob: -0.014328152872622013, bytes: [59], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " underlying" },
        logprobs: {
          content: [
            {
              token: " underlying",
              logprob: -0.040438707917928696,
              bytes: [32, 117, 110, 100, 101, 114, 108, 121, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " instead" },
        logprobs: {
          content: [
            {
              token: " instead",
              logprob: -0.4483672082424164,
              bytes: [32, 105, 110, 115, 116, 101, 97, 100],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " logic" },
        logprobs: {
          content: [
            { token: " logic", logprob: -0.0019687197636812925, bytes: [32, 108, 111, 103, 105, 99], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: "," },
        logprobs: {
          content: [{ token: ",", logprob: -1.9361264946837764e-7, bytes: [44], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " and" },
        logprobs: {
          content: [{ token: " and", logprob: -1.0720784664154053, bytes: [32, 97, 110, 100], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " provide" },
        logprobs: {
          content: [
            {
              token: " provide",
              logprob: -0.47126203775405884,
              bytes: [32, 112, 114, 111, 118, 105, 100, 101],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " potential" },
        logprobs: {
          content: [
            {
              token: " potential",
              logprob: -0.31877490878105164,
              bytes: [32, 112, 111, 116, 101, 110, 116, 105, 97, 108],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " insights" },
        logprobs: {
          content: [
            {
              token: " insights",
              logprob: -0.1801113784313202,
              bytes: [32, 105, 110, 115, 105, 103, 104, 116, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " considerations" },
        logprobs: {
          content: [
            {
              token: " considerations",
              logprob: -0.0066765290684998035,
              bytes: [32, 99, 111, 110, 115, 105, 100, 101, 114, 97, 116, 105, 111, 110, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " into" },
        logprobs: {
          content: [
            { token: " into", logprob: -0.024166930466890335, bytes: [32, 105, 110, 116, 111], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " related" },
        logprobs: {
          content: [
            {
              token: " related",
              logprob: -0.09888721257448196,
              bytes: [32, 114, 101, 108, 97, 116, 101, 100],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: -0.000051928003813372925, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " to" },
        logprobs: { content: [{ token: " to", logprob: 0.0, bytes: [32, 116, 111], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " underlying" },
        logprobs: {
          content: [
            {
              token: " underlying",
              logprob: -0.04993380233645439,
              bytes: [32, 117, 110, 100, 101, 114, 108, 121, 105, 110, 103],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: -0.020661000162363052, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " logic" },
        logprobs: {
          content: [
            { token: " logic", logprob: -0.0014353510923683643, bytes: [32, 108, 111, 103, 105, 99], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: " code" },
        logprobs: {
          content: [
            { token: " code", logprob: -0.20764653384685516, bytes: [32, 99, 111, 100, 101], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " of" },
        logprobs: {
          content: [{ token: " of", logprob: -0.44323480129241943, bytes: [32, 111, 102], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: ".\n" },
        logprobs: {
          content: [{ token: ".\n", logprob: -0.0016886276425793767, bytes: [46, 10], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " the" },
        logprobs: {
          content: [{ token: " the", logprob: -0.0051780203357338905, bytes: [32, 116, 104, 101], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 0,
        delta: { content: '"""' },
        logprobs: {
          content: [{ token: '"""', logprob: -0.000011041145626222715, bytes: [34, 34, 34], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " relevant" },
        logprobs: {
          content: [
            {
              token: " relevant",
              logprob: -1.0192135572433472,
              bytes: [32, 114, 101, 108, 101, 118, 97, 110, 116],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " code" },
        logprobs: {
          content: [
            { token: " code", logprob: -9.849109119386412e-6, bytes: [32, 99, 111, 100, 101], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " and" },
        logprobs: {
          content: [{ token: " and", logprob: -0.034490589052438736, bytes: [32, 97, 110, 100], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " any" },
        logprobs: {
          content: [{ token: " any", logprob: -0.7044426202774048, bytes: [32, 97, 110, 121], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " potential" },
        logprobs: {
          content: [
            {
              token: " potential",
              logprob: -0.00006110668618930504,
              bytes: [32, 112, 111, 116, 101, 110, 116, 105, 97, 108],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " considerations" },
        logprobs: {
          content: [
            {
              token: " considerations",
              logprob: -0.00983672495931387,
              bytes: [32, 99, 111, 110, 115, 105, 100, 101, 114, 97, 116, 105, 111, 110, 115],
              top_logprobs: [],
            },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " to" },
        logprobs: {
          content: [{ token: " to", logprob: -1.359351634979248, bytes: [32, 116, 111], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " keep" },
        logprobs: {
          content: [
            { token: " keep", logprob: -0.17338314652442932, bytes: [32, 107, 101, 101, 112], top_logprobs: [] },
          ],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " in" },
        logprobs: { content: [{ token: " in", logprob: 0.0, bytes: [32, 105, 110], top_logprobs: [] }], refusal: null },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: " mind" },
        logprobs: {
          content: [{ token: " mind", logprob: 0.0, bytes: [32, 109, 105, 110, 100], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: ".\n" },
        logprobs: {
          content: [{ token: ".\n", logprob: -0.0008397616329602897, bytes: [46, 10], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [
      {
        index: 1,
        delta: { content: '"""' },
        logprobs: {
          content: [{ token: '"""', logprob: -0.000010921942703134846, bytes: [34, 34, 34], top_logprobs: [] }],
          refusal: null,
        },
        finish_reason: null,
      },
    ],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [{ index: 0, delta: {}, logprobs: null, finish_reason: "stop" }],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [{ index: 1, delta: {}, logprobs: null, finish_reason: "stop" }],
    usage: null,
  },

  {
    id: "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    object: "chat.completion.chunk",
    created: 1751299200,
    model: "gpt-4o-mini-2024-07-18",
    service_tier: "default",
    system_fingerprint: "fp_0000000000",
    choices: [],
    usage: {
      prompt_tokens: 164,
      completion_tokens: 213,
      total_tokens: 377,
      prompt_tokens_details: { cached_tokens: 0, audio_tokens: 0 },
      completion_tokens_details: {
        reasoning_tokens: 0,
        audio_tokens: 0,
        accepted_prediction_tokens: 0,
        rejected_prediction_tokens: 0,
      },
    },
  },
];
test();
