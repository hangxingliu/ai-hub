import { parse as parseYaml } from "yaml";
import { existsSync, readFileSync } from "fs";
import { dirname, resolve } from "path";
import type { Config } from "./types.ts";
import { validateSchema } from "../utils/json-schema/validator.ts";
import { configSchema } from "./schema.ts";
import { getErrorMessage } from "../utils/error.ts";

export type LoadedConfig = Config & {
  baseDir: string;
  /** absolute file path */
  configFile: string;
};

export async function loadConfigFile(configFile: string): Promise<LoadedConfig> {
  // Resolve the absolute path of the config file
  const absoluteConfigFile = resolve(configFile);

  // Get the base directory of the config file
  const baseDir = dirname(absoluteConfigFile);

  // Check if the file exists
  if (!existsSync(absoluteConfigFile)) {
    throw new Error(`Configuration file not found: ${absoluteConfigFile}`);
  }

  try {
    // Read the file content
    const fileContent = readFileSync(absoluteConfigFile, "utf-8");

    // Parse YAML content
    const parsedConfig = parseYaml(fileContent) as Config;
    const validConfig = await validateSchema(parsedConfig, configSchema);

    // Return the LoadedConfig object
    return {
      ...validConfig,
      baseDir,
      configFile: absoluteConfigFile,
    };
  } catch (error) {
    throw new Error(`Failed to load configuration file: ${getErrorMessage(error)}`);
  }
}
