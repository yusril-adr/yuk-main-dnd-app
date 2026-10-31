import type { HomeMessages } from "./index";

declare module "i18next" {
  interface CustomResources {
    home: HomeMessages;
  }
}
