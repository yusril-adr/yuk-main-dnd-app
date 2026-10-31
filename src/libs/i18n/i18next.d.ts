import "i18next";

import type enCommon from "@/messages/en/common.json";

declare module "i18next" {
  interface CustomResources {
    common: typeof enCommon;
  }

  interface CustomTypeOptions {
    defaultNS: "common";
    resources: CustomResources;
  }
}
