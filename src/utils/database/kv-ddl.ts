import BunSQLiteDatabase from "bun:sqlite";

export function getKVTableDDL(escapedId: string) {
  const sqls: string[] = [];
  sqls.push(`PRAGMA journal_mode = WAL;`);
  sqls.push(
    `CREATE TABLE IF NOT EXISTS ${escapedId} (` +
      `key         TEXT PRIMARY KEY,` +
      `value       BLOB,` +
      `last_update INT NOT NULL,` +
      `expires     INT,` +
      `flags       INT NOT NULL` +
      `)`
  );
  sqls.push(`CREATE INDEX IF NOT EXISTS expires ON ${escapedId} (expires)`);
  sqls.push(`CREATE INDEX IF NOT EXISTS last_update ON ${escapedId} (last_update)`);
  return sqls;
}

export const enum KVFlag {
  NONE = 0,
  COMPRESSED = 1,
  JSON = 2,
  SERIALIZED = 4,
}

export type KVDatabaseItem<Value = Uint8Array> = {
  key: string;
  value: Value;
  last_update: number;
  expires?: number;
  flags: number;
};

export type BunSQLiteKVConfig = {
  db: BunSQLiteDatabase;
  tableName: string;
  schemaName?: string;
  init?: boolean;

  /** ms */
  defaultTTL?: number;
  /** compress large data by default */
  compression?: boolean;
  /** use V8's serialization by default */
  serialization?: boolean;
};
