import { TBaseEntity } from "./base-entity";

export type TPermissionEntity = TBaseEntity & {
  module: string;
  action: string;
  key: string;
};
