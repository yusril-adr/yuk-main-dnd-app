import type { RoleKeyEnum } from "@/common/enums/role-key";
import type { PermissionEnum } from "@/common/enums/permission";
import type { NavSidebarVariantEnum } from "@/app/(authenticated)/_enums/nav-sidebar-variant";
import type { LucideIcon } from "lucide-react";

export type TNavSidebar = {
  title: string;
  icon?: LucideIcon;
  path?: string;
  authorizedRoles?: RoleKeyEnum[];
  authorizedPermissions?: PermissionEnum[];
  children?: TNavSidebar[];
  variant?: NavSidebarVariantEnum;
};
