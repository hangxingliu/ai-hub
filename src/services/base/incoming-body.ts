import type { BunRequest } from "bun";
import type { ParsedContentType } from "../../utils/http-headers.ts";
import { getErrorMessage } from "../../utils/error.ts";

export function parseIncomingModelId(body: unknown) {
  if (body && typeof body === "object") {
    if ("model" in body && typeof body.model === "string") return body.model;
    // TODO: FormData
  }
}

export type ParsedIncomingBody = {
  original: Request['body'] | null,
  raw?: ArrayBuffer;
  json?: unknown;
  warning?: string;
  modelId?: string;
};

export async function parseIncomingBody(
  req: Request,
  method: Uppercase<string>,
  contentType: ParsedContentType
): Promise<ParsedIncomingBody> {
  let rawBody: ArrayBuffer | undefined;
  let jsonBody: unknown | undefined;
  let warning: string | undefined;
  let modelId: string | undefined;

  if (contentType.isJSON && method !== "GET" && method !== "HEAD") {
    try {
      rawBody = await req.arrayBuffer();
    } catch (error) {
      throw "Failed to load body: " + getErrorMessage(error);
    }

    if (contentType.isJSON) {
      try {
        jsonBody = JSON.parse(Buffer.from(rawBody).toString("utf-8"));
      } catch (error) {
        warning = "Invalid JSON body (use default route)";
      }

      modelId = parseIncomingModelId(jsonBody);
    }
  }

  return { original: req.body, raw: rawBody, json: jsonBody, warning, modelId };
}
