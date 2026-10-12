import type { TRoleEntity } from "@/api/main/types/entities/iam/role-entity";

export type TRoleOptionResponse = Pick<TRoleEntity, "id" | "name">;
