import type { TUserEntity } from "@/api/main/types/entities/iam/user-entity";

export type TUserOptionResponse = Pick<TUserEntity, "id" | "display_name"> & {
  username: string | null;
};
