export type TypeFromJSONSchema<Schema> = Schema extends { allOf: Array<infer AllOf> }
  ? TypeFromJSONSchema<UnionToIntersection<AllOf>>
  : Schema extends { oneOf: Array<infer OneOf> }
  ? TypeFromJSONSchema<OneOf>
  : Schema extends { anyOf: Array<infer AnyOf> }
  ? TypeFromJSONSchema<AnyOf>
  : Schema extends { enum: Array<infer Enum> }
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

/**
 * @see https://github.com/sindresorhus/type-fest/blob/main/source/union-to-intersection.d.ts
 */
type UnionToIntersection<Union> = // `extends unknown` is always going to be the case and is used to convert the
  // `Union` into a [distributive conditional
  // type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
  (
    Union extends unknown
      ? // The union type is used as the only argument to a function since the union
        // of function arguments is an intersection.
        (distributedUnion: Union) => void
      : // This won't happen.
        never
  ) extends // Infer the `Intersection` type since TypeScript represents the positional
  // arguments of unions of functions as an intersection of the union.
  (mergedIntersection: infer Intersection) => void
    ? // The `& Union` is to allow indexing by the resulting type
      Intersection & Union
    : never;
