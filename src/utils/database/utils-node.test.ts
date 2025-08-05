import { DatabaseSync } from "node:sqlite";
import { escapeId } from "./utils.js";
import { NodejsSQLiteKV } from "./kv.nodejs.js";

[
  //
  "",
  "tbl",
  "tbl ",
  'tbl "123"',
]
  .map(escapeId)
  .forEach((it) => console.log(it));

const db = new DatabaseSync(":memory:");
db.exec(`CREATE TABLE tbl (id INT)`);
db.exec(`INSERT INTO tbl VALUES (10), (50), (99)`);

const statement = db.prepare(`SELECT * FROM tbl WHERE id > $gt AND id < $lt`);
const res = statement.all({ $gt: 30, $lt: 100 });
console.log(res);

const kv = new NodejsSQLiteKV({ db, tableName: 'kv', serialization: true });
kv.set('xxx', new Date());
console.log(kv.get('xxx'));
