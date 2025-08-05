import { KVFlag, type KVDatabaseItem } from "./kv-ddl.ts";
import { gunzipSync, gzipSync } from "zlib";
import { deserialize, serialize } from "v8";

export class SQLiteKVCore {
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

    if (buffer.length > SQLiteKVCore.MIN_GZ_SIZE && _flags & KVFlag.COMPRESSED) {
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
