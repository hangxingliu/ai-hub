import Database from "bun:sqlite";
import { escapeId } from "./utils.ts";

[
  //
  "",
  "tbl",
  "tbl ",
  'tbl "123"',
]
  .map(escapeId)
  .forEach((it) => console.log(it));

const db = new Database(":memory:");
db.run(`CREATE TABLE tbl (id INT)`);
db.run(`INSERT INTO tbl VALUES (10), (50), (99)`);

const statement = db.prepare<{ id: number }, { $gt: number; $lt: number }>(`SELECT * FROM tbl WHERE id > $gt AND id < $lt`);
const res = statement.all({ $gt: 30, $lt: 100 });
console.log(res);
