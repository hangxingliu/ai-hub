import { basename, resolve } from "node:path";

/** https://bun.com/guides/runtime/build-time-constants */
declare const CUSTOM_PROJECT_ROOT: string;

const isBundled = basename(import.meta.filename) !== "path.ts";

export const PROJECT_ROOT =
  typeof CUSTOM_PROJECT_ROOT === "string"
    ? CUSTOM_PROJECT_ROOT
    : isBundled
    ? import.meta.dirname
    : resolve(import.meta.dirname, "..");
