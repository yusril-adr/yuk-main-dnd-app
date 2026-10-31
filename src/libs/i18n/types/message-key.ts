type TPluralSuffix =
  | "_zero"
  | "_one"
  | "_two"
  | "_few"
  | "_many"
  | "_other";

/** Dot keys of a messages object; plural leaves also allow the unsuffixed base. */
export type TMessageKey<T> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ? `${K}.${TMessageKey<T[K]>}`
    :
        | K
        | (K extends `${infer Base}${TPluralSuffix}` ? Base : never);
}[keyof T & string];
