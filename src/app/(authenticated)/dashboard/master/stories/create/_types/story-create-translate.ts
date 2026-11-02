import type { TMessageKey } from "@/libs/i18n/types/message-key";
import type { TTranslateOptions } from "@/libs/i18n/types/translate-options";

import type en from "@/app/(authenticated)/dashboard/master/stories/create/_messages/en.json";

export type TStoryCreateTranslate = (
  key: TMessageKey<typeof en>,
  options?: TTranslateOptions,
) => string;
