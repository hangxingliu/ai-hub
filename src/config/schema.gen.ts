//@ts-check
import { resolve } from "path";
import { writeFileSync } from "fs";
import { configSchema } from "./schema.js";

const targetFile = resolve(import.meta.dirname, "../../assets/config-schema.json");
writeFileSync(targetFile, JSON.stringify(configSchema, null, 2));
console.log(`+ generated ${targetFile}`);
