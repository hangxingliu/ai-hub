import type { TypeFromJSONSchema } from "./types.js";

export async function validateSchema<Schema>(object: unknown, jsonSchema: Schema): Promise<TypeFromJSONSchema<Schema>> {
  const { Ajv } = await import("ajv");
  const useAjvFormats = await import("ajv-formats");

  const ajv = new Ajv();
  useAjvFormats.default(ajv);

  const fn = ajv.compile<TypeFromJSONSchema<Schema>>(jsonSchema as any);
  if (!fn(object)) {
    const errors = fn.errors || [];
    let message = "Invalid config: ";
    for (let i = 0; i < errors.length; i++) {
      const error = errors[i];
      message += `${i > 0 ? "\n" : ""}${error.instancePath} ${error.message}`;
    }
    throw message;
  }

  return object;
}
