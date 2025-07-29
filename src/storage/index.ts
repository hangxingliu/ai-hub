import Database from "bun:sqlite";
import { resolve } from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import type { LoadedConfig } from "../config/loader.ts";
import { DebugDataWritter } from "../utils/debug-data-writter.ts";
import { parseAIUpstream, type ParsedAIUpstream } from "../config/parsers/ai-upstream.ts";
import { Envsubst } from "../utils/envsubst.ts";
import { BunSQLiteKV } from "../utils/database/kv.ts";
import { ModelsManager } from "./models.ts";
import { ProxyAgents } from "./http-proxy-agents.ts";
import type { KVs } from "./kv.ts";
import type { ResolvedPlugin } from "../api-types.ts";

export class StorageManager implements Disposable {
  readonly storageDir: string;
  readonly writeLogs: DebugDataWritter["write"];

  readonly upstreams: ParsedAIUpstream[];
  readonly proxyAgents: ProxyAgents;
  readonly models = new ModelsManager();

  readonly sqlite: Database;
  readonly kv: BunSQLiteKV<KVs>;

  readonly plugins: ResolvedPlugin[] = [];

  constructor(readonly config: LoadedConfig) {
    let relDir = "storage";
    if (config.storage?.baseDir) relDir = config.storage.baseDir;

    const env = new Envsubst();
    this.upstreams = config.upstreams.map((it) => parseAIUpstream(it, env));
    this.proxyAgents = new ProxyAgents(config);

    const storageDir = resolve(config.baseDir, relDir);
    if (!existsSync(storageDir)) mkdirSync(storageDir, { recursive: true });
    this.storageDir = storageDir;

    const debugWritter = new DebugDataWritter(resolve(storageDir, "logs"));
    this.writeLogs = debugWritter.write.bind(debugWritter);

    this.sqlite = new Database(resolve(storageDir, "ai-hub-v1.db"));
    this.kv = new BunSQLiteKV({
      db: this.sqlite,
      tableName: "kv",
    });
  }

  getUpstream(name: string) {
    return this.upstreams.find(it => it.name === name);
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
