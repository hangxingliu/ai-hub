//@ts-check
import { writeFileSync, globSync } from "node:fs";
import { basename, resolve } from "node:path";
import { configSchema } from "./schema.js";
import type { JSONSchema } from "../utils/json-schema/schema-types.js";
import type { Plugin } from "../plugins/types.js";

const targetFile = resolve(import.meta.dirname, "../../assets/config-schema.json");
const cwd = resolve(import.meta.dirname, "../plugins/builtin");
const builtinPlugins = globSync("*.ts", { cwd }).sort();

const conds: { cond: string; schema: JSONSchema }[] = [];
const anyNames: string[] = [];
for (const pluginFileRelative of builtinPlugins) {
  const pluginFile = resolve(cwd, pluginFileRelative);

  const name = basename(pluginFileRelative);
  if (name.startsWith(".") || name.startsWith("__")) continue;

  const mod = (await import(pluginFile)).default as Plugin;
  if (typeof mod?.configSchema !== "object" && !mod.configSchema) {
    console.error(`No \`configSchema\` in "${pluginFile}"`);
    continue;
  }

  const thisName = mod.pluginName;
  if (!thisName) {
    console.error(`No \`pluginName\` in "${pluginFile}"`);
    continue;
  }

  const thisConfig = mod.configSchema.properties;
  if (thisConfig && Object.keys(thisConfig).length > 0) conds.push({ cond: thisName, schema: mod.configSchema });
  anyNames.push(thisName);
}

// const generalPluginSchema = configSchema.properties.plugins.items;
let ptr = configSchema.properties.plugins.items as JSONSchema;
ptr.properties!.use = {
  anyOf: [...anyNames.map((it) => ({ const: it })), ptr.properties!.use],
};

while (conds.length > 0) {
  const { cond, schema } = conds.shift()!;
  ptr.if = { properties: { use: { const: cond } } };
  ptr.then = { properties: { configs: schema } };
  ptr.else = {};
  ptr = ptr.else;
}
// (configSchema.properties.plugins.items as any) = { anyOf };

writeFileSync(targetFile, JSON.stringify(configSchema, null, 2));
console.log(`+ generated ${targetFile}`);
