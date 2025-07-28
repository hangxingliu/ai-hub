export type TypeFromJSONSchema<Schema> = Schema extends { enum: Array<infer Enum> }
  ? Enum
  : Schema extends { type: "string" }
    ? string
    : Schema extends { type: "boolean" }
      ? boolean
      : Schema extends { type: "numbr" } | { type: "integer" }
        ? number
        : Schema extends { type: "object"; properties: infer Props }
          ? { [x in keyof Props]: TypeFromJSONSchema<Props[x]> }
          : Schema extends { type: "array"; items: infer ItemType }
            ? TypeFromJSONSchema<ItemType>[]
            : any;
