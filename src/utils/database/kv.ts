import { Statement, type Changes } from "bun:sqlite";
import { escapeId } from "./utils.ts";
import { getKVTableDDL, KVFlag, type BunSQLiteKVConfig, type KVDatabaseItem } from "./kv-ddl.ts";
import { gunzipSync, gzipSync } from "bun";
import { deserialize, serialize } from "v8";

/**
 * @version 2025-07-26
 */
export class BunSQLiteKV<Values extends { [key: string]: any }> {
  readonly id: string;
  readonly statGet: Statement<KVDatabaseItem, [{ $key: string; $now: number }]>;
  readonly statByPage: Statement<KVDatabaseItem, [{ $offset: number; $limit: number; $now: number }]>;
  readonly statGlobByPage: Statement<
    KVDatabaseItem,
    [{ $glob: string; $offset: number; $limit: number; $now: number }]
  >;
  readonly statSet: Statement<
    never,
    [
      {
        $key: string;
        $value: Buffer | Uint8Array;
        $last_update: number;
        $expires: number | null;
        $flags: number;
      }
    ]
  >;
  readonly statGlobDelete: Statement<KVDatabaseItem, [{ $glob: string }]>;
  readonly statDelete: Statement<KVDatabaseItem, [{ $key: string }]>;
  readonly statGlobCount: Statement<{ count: number }, [{ $glob: string; $now: number }]>;
  readonly statCount: Statement<{ count: number }, [{ $now: number }]>;
  readonly statClear: Statement<never>;
  readonly statCleanup: Statement<never, [{ $now: number }]>;

  constructor(private readonly config: BunSQLiteKVConfig) {
    const { db, tableName, schemaName, init } = config;
    let id = escapeId(tableName);
    if (schemaName) id = `${escapeId(schemaName)}.${id}`;
    this.id = id;

    if (init !== false) {
      const ddl = getKVTableDDL(id);
      for (const sql of ddl) db.exec(sql);
    }

    const NOT_EXP = `(expires IS NULL OR expires > $now)` as const;
    this.statGet = db.prepare(`SELECT * FROM ${id} WHERE ${NOT_EXP} AND key = $key`);
    this.statByPage = db.prepare(`SELECT * FROM ${id} WHERE ${NOT_EXP} LIMIT $limit OFFSET $offset`);
    this.statGlobByPage = db.prepare(
      `SELECT * FROM ${id} WHERE ${NOT_EXP} AND key GLOB $glob LIMIT $limit OFFSET $offset`
    );
    this.statSet = db.prepare(
      `INSERT OR REPLACE INTO ${id} ` +
        `(key, value, last_update, expires, flags) VALUES ` +
        `($key, $value, $last_update, $expires, $flags)`
    );
    this.statDelete = db.prepare(`DELETE FROM ${id} WHERE key = $key`);
    this.statGlobDelete = db.prepare(`DELETE FROM ${id} WHERE key GLOB $glob`);
    this.statCount = db.prepare(`SELECT COUNT(0) as count FROM ${id} WHERE ${NOT_EXP}`);
    this.statGlobCount = db.prepare(`SELECT COUNT(0) as count FROM ${id} WHERE ${NOT_EXP} AND key GLOB $glob`);
    this.statClear = db.query(`DELETE FROM ${id}`);
    this.statCleanup = db.query(`DELETE FROM ${id} WHERE expires IS NOT NULL AND expires <= $now`);

    if (init !== false) this.cleanup();
  }

  get<Key extends keyof Values>(key: Key): Values[Key] | undefined {
    return this.getWithMeta(key)?.value;
  }
  getWithMeta<Key extends keyof Values>(key: Key): KVDatabaseItem<Values[Key]> | undefined {
    const item = this.statGet.get({ $key: key as string, $now: Date.now() });
    if (!item) return undefined;
    return { ...item, value: BunSQLiteKV.decodeDBValue(item) };
  }
  /**
   * @param args `page` is a 1-based page number
   */
  glob<Key extends keyof Values>(args: {
    glob?: string;
    page?: number;
    limit?: number;
  }): KVDatabaseItem<Values[Key]>[] {
    const page = { $limit: args.limit || 99, $offset: 0, $now: Date.now() };
    if (args.page) page.$offset = (args.page - 1) * page.$limit;

    const res = args.glob ? this.statGlobByPage.all({ ...page, $glob: args.glob }) : this.statByPage.all(page);
    for (const item of res) (item as KVDatabaseItem<Values[Key]>).value = BunSQLiteKV.decodeDBValue(item);
    return res as KVDatabaseItem<Values[Key]>[];
  }
  /**
   * @param ttl ms
   */
  set<Key extends keyof Values>(
    key: Key,
    val: Values[Key],
    ttl?: number,
    serialization?: boolean,
    compression?: boolean
  ): Changes {
    let flags: number = KVFlag.JSON;

    serialization ??= this.config.serialization;
    compression ??= this.config.compression;
    ttl ??= this.config.defaultTTL;

    if (serialization) flags = KVFlag.COMPRESSED;
    if (compression) flags = KVFlag.COMPRESSED;

    const now = Date.now();
    let expires: number | null = null;
    if (typeof ttl === "number" && ttl > 0) expires = now + ttl;

    const encoded = BunSQLiteKV.encodeDBValue(val, flags);
    return this.statSet.run({
      $key: key as string,
      $value: encoded.val,
      $last_update: now,
      $expires: expires,
      $flags: encoded.flags,
    });
  }
  delete(key: string, glob?: boolean): Changes {
    if (glob) return this.statGlobDelete.run({ $glob: key });
    return this.statDelete.run({ $key: key });
  }
  clear() {
    return this.statClear.run();
  }
  cleanup() {
    return this.statCleanup.run({ $now: Date.now() });
  }
  count(glob?: string) {
    if (glob) return this.statGlobCount.get({ $glob: glob, $now: Date.now() })!.count || 0;
    return this.statCount.get({ $now: Date.now() })!.count || 0;
  }

  static MIN_GZ_SIZE = 1024;
  static encodeDBValue(val: any, _flags: KVFlag): { val: Buffer | Uint8Array; flags: number } {
    let buffer: Buffer | Uint8Array;
    let flags = KVFlag.NONE;

    if (_flags & KVFlag.SERIALIZED) {
      buffer = serialize(val);
      flags = KVFlag.SERIALIZED;
    } else if (_flags & KVFlag.JSON) {
      buffer = Buffer.from(JSON.stringify(val), "utf8");
      flags = KVFlag.JSON;
    } else {
      buffer = val instanceof Buffer ? val : Buffer.from(String(val), "utf8");
    }

    if (buffer.length > BunSQLiteKV.MIN_GZ_SIZE && _flags & KVFlag.COMPRESSED) {
      buffer = gzipSync(buffer);
      flags |= KVFlag.COMPRESSED;
    }
    return { val: buffer, flags };
  }

  static decodeDBValue<T = any>(item: KVDatabaseItem): T {
    const val = item.flags & KVFlag.COMPRESSED ? Buffer.from(gunzipSync(item.value)) : item.value;
    if (item.flags & KVFlag.SERIALIZED) {
      const decoded = deserialize(val);
      return decoded;
    }
    if (item.flags & KVFlag.JSON) {
      const str = (Buffer.isBuffer(val) ? val : Buffer.from(val)).toString("utf8");
      return JSON.parse(str);
    }
    return val as T;
  }
}
