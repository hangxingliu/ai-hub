import { Readable } from "node:stream";
import { randomBytes } from "node:crypto";
import { join, resolve } from "node:path";
import { createWriteStream, existsSync, statSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import Busboy, { type BusboyHeaders } from "@fastify/busboy";

import { Tick } from "../../utils/tick.js";
import { getErrorMessage } from "../../utils/error.js";
import { COLORS_ALL } from "../../utils/colors/index.js";
import { formatDate } from "../../utils/format-date.js";

const { DIM, RESET } = COLORS_ALL;

export type ParsedFormFile = {
  fileSize: number;
  localPath: string;
  /** The original file name */
  fileName: string;
  mimeType: string;
  encoding: string;
};
/**
 * Why this new type:
 * because the built-in {@link FormData} doesn't support storing extra infomation
 */
export type ParsedFormItem = [key: string, val: string | ParsedFormFile];

/**
 * @see https://github.com/oven-sh/bun/issues/18701
 * @see https://github.com/nodejs/undici/pull/2892
 */
export async function parseIncomingFormData(req: Pick<Request, "headers" | "body">, filesDir: string) {
  const formData: ParsedFormItem[] = [];

  const now = new Date();
  const targetDir = resolve(filesDir, formatDate("yyyy-mm-dd", now));
  const fileNamePrefix = formatDate("HHMMSS-", now) + randomBytes(2).toHex() + "-";

  if (!existsSync(targetDir)) await mkdir(targetDir, { recursive: true });

  return new Promise<ParsedFormItem[]>((resolve, reject) => {
    const { tick, peek } = new Tick();
    const busboy = new Busboy({ headers: req.headers.toJSON() as BusboyHeaders });
    let incr = 1;

    busboy.on("file", (fieldName, fileStream, fileName, encoding, mimeType) => {
      let targetName = fileNamePrefix + incr++;
      const matchedExt = fileName.match(/\.([\w-]+)$/);
      if (matchedExt) targetName += "." + matchedExt[1];

      const targetFile = join(targetDir, targetName);
      const log = `form-data file "${fieldName}" => "${targetName}" (original name: "${fileName}")`;
      console.log(`-> ${log} ${DIM}+${peek().str}${RESET}`);
      fileStream.pipe(createWriteStream(targetFile));
      fileStream.once("error", (err) => {
        console.error(`-> form-data error "${fieldName}": ${getErrorMessage(err)}`);
      });
      fileStream.once("end", () => {
        console.log(`-> form-data file "${fieldName}" done ${DIM}+${peek().str}${RESET}`);
        let fileSize: number;
        // fileSize = Bun.file(targetFile);
        fileSize = statSync(targetFile).size;
        formData.push([
          fieldName,
          {
            fileSize,
            localPath: targetFile,
            fileName,
            encoding,
            mimeType,
          },
        ]);
      });
    });
    busboy.on("field", (fieldName, val) => {
      formData.push([fieldName, val]);
    });
    busboy.once("error", (err) => {
      console.error(`-> form-data error: ${getErrorMessage(err)}`);
      reject(err);
    });
    busboy.once("finish", () => {
      resolve(formData);
      const fieldNames = formData.map((it) => it[0]);
      console.log(`-> form-data finished fields: ${fieldNames.join(", ")} ${DIM}+${tick().str}${RESET}`);
    });
    Readable.from(req.body!).pipe(busboy);
  });
}
