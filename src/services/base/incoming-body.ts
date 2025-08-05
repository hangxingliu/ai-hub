import type { ParsedContentType } from "../../utils/http-headers.js";
import { getErrorMessage } from "../../utils/error.js";
import { parseIncomingFormData, type ParsedFormItem } from "./incoming-body-form-data.js";

export function parseIncomingModelId(body: unknown) {
  if (body && typeof body === "object") {
    if ("model" in body && typeof body.model === "string") return body.model;
    // TODO: FormData
  }
}

export type ParsedIncomingBody = {
  original: Request["body"] | null;
  raw?: ArrayBuffer;
  json?: unknown;
  form?: ParsedFormItem[];
  warning?: string;
  modelId?: string;
};

export async function parseIncomingBody(
  req: Request,
  method: Uppercase<string>,
  contentType: ParsedContentType,
  filesDir: string
): Promise<ParsedIncomingBody> {
  let rawBody: ArrayBuffer | undefined;
  let jsonBody: unknown | undefined;
  let warning: string | undefined;
  let modelId: string | undefined;
  let form: ParsedFormItem[] | undefined;

  if (method !== "GET" && method !== "HEAD") {
    if (contentType.isJSON) {
      try {
        rawBody = await req.arrayBuffer();
      } catch (error) {
        throw "Failed to load body: " + getErrorMessage(error);
      }

      try {
        jsonBody = JSON.parse(Buffer.from(rawBody).toString("utf-8"));
      } catch (error) {
        warning = "Invalid JSON body (use default route)";
      }

      modelId = parseIncomingModelId(jsonBody);
    } else if (contentType.isFormData) {
      // rawBody = await req.arrayBuffer();
      form = await parseIncomingFormData(req, filesDir);

      const rawModelVal = form.find((it) => it[0] === "model");
      if (typeof rawModelVal?.[1] === "string") modelId = rawModelVal[1];
    }
  }

  return { original: req.body, raw: rawBody, json: jsonBody, form, warning, modelId };
}
