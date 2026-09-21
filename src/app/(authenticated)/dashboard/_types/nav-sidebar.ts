import type { RoleKeyEnum } from "@/common/enums/role-key";
import type { NavSidebarVariantEnum } from "@/app/(authenticated)/dashboard/_enums/nav-sidebar-variant";
import type { LucideIcon } from "lucide-react";

export type TNavSidebar = {
  title: string;
  icon?: LucideIcon;
  path?: string;
  authorizedRoles?: RoleKeyEnum[];
  children?: TNavSidebar[];
  variant?: NavSidebarVariantEnum;
};
