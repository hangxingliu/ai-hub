//@ts-check
import { basename, resolve } from "path";
import { writeFileSync } from "fs";
import { configSchema } from "./schema.js";
import type { JSONSchema } from "../utils/json-schema/schema-types.js";
import { Glob } from "bun";

const targetFile = resolve(import.meta.dirname, "../../assets/config-schema.json");
const builtinPlugins = new Glob("*.ts").scan({
  cwd: resolve(import.meta.dirname, "../plugins/builtin"),
  absolute: true,
});

const anyOf: JSONSchema[] = [];
const anyNames: string[] = [];
for await (const pluginFile of builtinPlugins) {
  const name = basename(pluginFile);
  if (name.startsWith(".") || name.startsWith("__")) continue;

  const mod = await import(pluginFile);
  if (typeof mod?.pluginSchema !== "object" && !mod.pluginSchema) continue;
  anyOf.push(mod.pluginSchema);
}

const generalPluginSchema = configSchema.properties.plugins.items;
anyOf.push(generalPluginSchema);
(configSchema.properties.plugins.items as any) = { anyOf };

writeFileSync(targetFile, JSON.stringify(configSchema, null, 2));
console.log(`+ generated ${targetFile}`);
