import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { randomBytes } from "node:crypto";
import type { Writable } from "node:stream";
import type { ParsedFormFile, ParsedFormItem } from "../services/base/incoming-body-form-data.ts";

// Define the line break constant used in multipart formatting.
const LINE_BREAK = "\r\n";

// Default content type for unknown Blob types.
const DEFAULT_CONTENT_TYPE = "application/octet-stream";

type CustomHeaders = {
  "transfer-encoding"?: "chunked";
  "content-type": string;
  "content-length": string;
};

export type StringifiedFormData = {
  headers: CustomHeaders;
  write: (writable: Pick<Writable, "write">) => Promise<void>;
  contentLength: number;
};

export function stringifyFormData(formData: ParsedFormItem[]): StringifiedFormData {
  // Generate a unique boundary string similar to browser implementations.
  const boundary = "------------------------" + randomBytes(10).toString("hex");

  // Prepare the headers object with the multipart Content-Type.
  const headers: CustomHeaders = {
    // "transfer-encoding": "chunked",
    "content-type": `multipart/form-data; boundary=${boundary}`,
    "content-length": "0",
  };

  let contentLength = 0;
  const entries: [header: Buffer, bodySize: number, body: Buffer | ParsedFormFile][] = [];
  for (const entry of formData) {
    // Overwrite Bun's incorrect type definition:
    // const [key, value] = entry as [string, string | BunFile];
    const [key, value] = entry;

    // Build the multipart header for this field.
    let header = `--${boundary}${LINE_BREAK}`;
    header += `Content-Disposition: form-data; name="${key}"`;

    // Handle Blob/File specifics: add filename and Content-Type if applicable.
    if (typeof value !== "string") {
      // Add filename if present (typically for File objects).
      header += `; filename="${basename(value.fileName)}"`;

      // Determine Content-Type: use provided type or default for Blobs.
      const contentType = value.mimeType || DEFAULT_CONTENT_TYPE;
      header += `${LINE_BREAK}Content-Type: ${contentType}`;
    }

    // Finalize header with empty line separator.
    header += `${LINE_BREAK}${LINE_BREAK}`;

    let bodySize: number;
    let body: Buffer | ParsedFormFile;
    if (typeof value === "string") {
      body = Buffer.from(value);
      bodySize = body.length;
    } else {
      // For Blobs/Files, consume the web ReadableStream and yield chunks as Buffers.
      body = value;
      bodySize = value.fileSize;
    }
    entries.push([Buffer.from(header), bodySize, body]);
    contentLength += header.length + bodySize + LINE_BREAK.length;
  }

  const ending = Buffer.from(`--${boundary}--${LINE_BREAK}`);
  contentLength += ending.length;

  function write(req: Pick<Writable, "write">) {
    /**
     * load all buffer into the memory and send them by single `write` call.
     * due to the issue <https://github.com/oven-sh/bun/issues/21620>
     */
    const buffers: Buffer[] = [];
    for (const [header, bodySize, body] of entries) {
      buffers.push(header);
      if (Buffer.isBuffer(body)) {
        buffers.push(body);
      } else {
        buffers.push(readFileSync(body.localPath));
      }
      buffers.push(Buffer.from(LINE_BREAK));
    }
    buffers.push(ending);
    req.write(Buffer.concat(buffers));
    return Promise.resolve();
  }

  headers["content-length"] = contentLength.toFixed(0);
  return {
    headers,
    write,
    contentLength,
  };
}
