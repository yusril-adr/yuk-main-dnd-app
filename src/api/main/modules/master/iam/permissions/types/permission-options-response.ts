import type { TPermissionEntity } from "@/api/main/types/entities/iam/permission-entity";

export type TPermissionOptionResponse = Pick<
  TPermissionEntity,
  "id" | "module" | "action"
>;
