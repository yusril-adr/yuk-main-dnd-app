import "i18next";

import type enCommon from "@/messages/en/common.json";
import type enHome from "@/messages/en/home.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof enCommon;
      home: typeof enHome;
    };
  }
}
