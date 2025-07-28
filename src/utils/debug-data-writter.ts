import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, relative, resolve } from "node:path";
import { formatDate } from "./format-date.js";

export const DEFAULT_LOGS_DIR_PATH = resolve(import.meta.dirname, "../../logs");

/**
 * Write debug data into `/path/to/dir/category/yyyymmdd-HHMMSS.json`
 */
export class DebugDataWritter {
  private readonly initedCategories = new Set<string>();
  /** key: category name */
  private lastTimestamp = new Map<string, { ts: number; suffix: number }>();

  private dataDir: string | undefined;
  private dataDirGetter: (() => string) | undefined;
  constructor(dataDir: string | (() => string) = DEFAULT_LOGS_DIR_PATH) {
    if (typeof dataDir === "string") this.dataDir = dataDir;
    else this.dataDirGetter = dataDir;
  }

  private initDir(category: string) {
    if (typeof this.dataDir !== "string") this.dataDir = this.dataDirGetter!();
    const dir = resolve(this.dataDir, category);
    if (this.initedCategories.has(category)) return dir;

    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    this.initedCategories.has(category);
    return dir;
  }

  private init(_category: string, extName?: string) {
    const category = basename(_category).replace(/^\.+$/, "");
    if (!category) throw new Error(`Invalid category name "${_category}"`);

    const dataDir = this.initDir(category);

    let suffix: number | undefined;
    const now = new Date();
    const prev = this.lastTimestamp.get(category);
    const nowUnix = Math.floor(now.getTime() / 1000);
    if (prev && nowUnix === prev.ts) {
      suffix = ++prev.suffix;
    } else {
      this.lastTimestamp.set(category, { ts: nowUnix, suffix: 0 });
    }

    const fileName =
      formatDate("yyyymmdd-HHMMSS", now) + (typeof suffix === "number" ? `-${suffix}` : "") + (extName || ".json");
    const filePath = resolve(dataDir, fileName);
    const relativePath = relative(process.cwd(), filePath);
    return { category, fileName, filePath, relativePath };
  }

  /**
   * @param category For example: 'list-users'
   */
  write<T>(_category: string, data: T, printLog = true): { data: T; filePath: string } | undefined {
    let relativePath = "";
    try {
      const isJSON = !(typeof data === "string" || Buffer.isBuffer(data) || data instanceof Blob);
      const r = this.init(_category, isJSON ? undefined : ".dat");

      relativePath = r.relativePath;
      if (isJSON) writeFileSync(r.filePath, JSON.stringify(data));
      else if (data instanceof Blob) data.arrayBuffer().then((buf) => writeFileSync(r.filePath, Buffer.from(buf)));
      else writeFileSync(r.filePath, data);

      if (printLog) process.stderr.write(`debug: dump to "${relativePath}"\n`);
      return { data, filePath: r.filePath };
    } catch (error) {
      console.error(`error: failed to write data file "${relativePath}"`, error);
    }
  }
}
