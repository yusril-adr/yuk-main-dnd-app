import type { TUserEntity } from "@/api/main/types/entities/iam/user-entity";

export type TUserOptionResponse = Pick<
  TUserEntity,
  "id" | "display_name" | "is_guest"
> & {
  username: string | null;
};
