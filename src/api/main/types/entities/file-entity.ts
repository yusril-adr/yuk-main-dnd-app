import { TBaseEntity } from "./base-entity";

export type TFileEntity = TBaseEntity & {
  name: string;
  bucket: string;
  path: string;
  mimetype: string;
  size: number;
  driver: string;
  url?: string;
  status: string;
};
