import type { Resource } from "i18next";

import type { TLocale } from "./locale";

export type TCreateI18nInstanceInput = {
  locale: TLocale;
  resources?: Resource;
};
