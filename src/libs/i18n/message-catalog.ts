import type { Locale } from "./locales";

/** Section or shared message pack passed to useT. */
export type MessageCatalog<T extends object = object> = {
  namespace: string;
  en: T;
  id: T;
};

export type CatalogMessages<C> =
  C extends MessageCatalog<infer T> ? T : never;

type PluralSuffix =
  | "_zero"
  | "_one"
  | "_two"
  | "_few"
  | "_many"
  | "_other";

/** Dot keys of a messages object; plural leaves also allow the unsuffixed base. */
export type MessageKey<T> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ? `${K}.${MessageKey<T[K]>}`
    :
        | K
        | (K extends `${infer Base}${PluralSuffix}` ? Base : never);
}[keyof T & string];

export type LocaleBundles = Record<Locale, object>;

export function catalogLocaleBundles(
  catalog: MessageCatalog,
): LocaleBundles {
  return { en: catalog.en, id: catalog.id };
}
