import type { TNavSidebar } from "@/app/(authenticated)/_types/nav-sidebar";
import { FileClock, Gauge, Shredder, Users } from "lucide-react";
import { RoleKeyEnum } from "@/common/enums/role-key";

const NAV_ROUTES: TNavSidebar[] = [
  {
    title: "Dashboard",
    icon: Gauge,
    path: "/dashboard",
  },
  {
    title: "Users",
    icon: Users,
    path: "/dashboard/users",
  },
  {
    title: "Requests",
    icon: Shredder,
    path: "/dashboard/requests",
  },
  {
    title: "Audit Logs",
    icon: FileClock,
    path: "/dashboard/audit-logs",
    authorizedRoles: [RoleKeyEnum.ADMIN, RoleKeyEnum.OPERATOR],
  },
];

export default NAV_ROUTES;
