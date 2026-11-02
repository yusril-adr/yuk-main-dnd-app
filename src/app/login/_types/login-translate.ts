import type { TMessageKey } from "@/libs/i18n/types/message-key";
import type { TTranslateOptions } from "@/libs/i18n/types/translate-options";

import type en from "@/app/login/_messages/en.json";

export type TLoginTranslate = (
  key: TMessageKey<typeof en>,
  options?: TTranslateOptions,
) => string;
