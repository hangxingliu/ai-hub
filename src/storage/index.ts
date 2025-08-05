import Database from "bun:sqlite";
import { join, resolve } from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import type { LoadedConfig } from "../config/loader.ts";
import { DebugDataWritter } from "../utils/debug-data-writter.ts";
import { parseAIUpstream, type ParsedAIUpstream } from "../config/parsers/ai-upstream.ts";
import { Envsubst } from "../utils/envsubst.ts";
import { BunSQLiteKV } from "../utils/database/kv.bun.ts";
import { ModelsManager } from "./models.ts";
import { ProxyAgents } from "./http-proxy-agents.ts";
import type { KVs } from "./kv.ts";
import type { ResolvedPlugin } from "../plugins/types.ts";

export class StorageManager implements Disposable {
  readonly storageDir: string;

  /** A directory for saving files for proxy */
  readonly proxyFilesDir: string;
  /** A directory for saving uploaded files */
  readonly uploadedFilesDir: string;

  readonly writeLogs: DebugDataWritter["write"];

  readonly upstreams: ParsedAIUpstream[];
  readonly fallbackUpstream: ParsedAIUpstream | undefined;

  readonly proxyAgents: ProxyAgents;
  readonly models: ModelsManager;

  readonly sqlite: Database;
  readonly kv: BunSQLiteKV<KVs>;

  readonly plugins: ResolvedPlugin[] = [];

  constructor(readonly config: LoadedConfig, prev?: StorageManager) {
    let relDir = "storage";
    if (config.storage?.baseDir) relDir = config.storage.baseDir;

    const env = new Envsubst();
    this.upstreams = config.upstreams.map((it) => parseAIUpstream(it, env));
    this.proxyAgents = new ProxyAgents(config);

    const fallbackUpstreams = this.upstreams.filter((it) => it.fallback);
    this.fallbackUpstream = fallbackUpstreams[0];
    if (fallbackUpstreams.length > 1) {
      const names = fallbackUpstreams.map((it) => it.name).join(", ");
      const picked = this.fallbackUpstream.name;
      console.warn(`warn: multiple fallback upstreams: ${names} (picked: "${picked}")`);
    }

    const storageDir = resolve(config.baseDir, relDir);
    if (!existsSync(storageDir)) mkdirSync(storageDir, { recursive: true });
    this.storageDir = storageDir;
    this.proxyFilesDir = join(storageDir, "files");
    this.uploadedFilesDir = join(storageDir, "files-uploaded");

    if (prev) {
      if (prev.storageDir === storageDir) {
        this.writeLogs = prev.writeLogs;
        this.sqlite = prev.sqlite;
        this.kv = prev.kv;
        this.models = prev.models;
        return;
      }
      prev.close();
    }

    const debugWritter = new DebugDataWritter(resolve(storageDir, "logs"));
    this.writeLogs = debugWritter.write.bind(debugWritter);

    this.sqlite = new Database(resolve(storageDir, "ai-hub-v1.db"));
    this.models = new ModelsManager();
    this.kv = new BunSQLiteKV({
      db: this.sqlite,
      tableName: "kv",
    });
  }

  getUpstream(name: string) {
    return this.upstreams.find((it) => it.name === name);
  }

  getUpstreamByModel(modelId: string) {
    const models = this.models.findByModelId(modelId);
    if (models.length === 0) return;
    return this.getUpstream(models[0].upstream);
  }

  close() {
    console.log(`closing StorageManager ...`);
    this.sqlite.close();
  }
  [Symbol.dispose](): void {
    this.close();
  }
}
