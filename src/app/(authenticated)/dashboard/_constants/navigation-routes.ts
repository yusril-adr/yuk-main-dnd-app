import type { TNavSidebar } from "@/app/(authenticated)/_types/nav-sidebar";
import { BrainCircuit, FileClock, Gauge, Shredder, Users } from "lucide-react";
import { RoleKeyEnum } from "@/common/enums/role-key";

const NAV_ROUTES: TNavSidebar[] = [
  {
    title: "Dashboard",
    icon: Gauge,
    path: "/dashboard",
  },
  {
    title: "Requestor",
    icon: BrainCircuit,
    children: [
      {
        title: "Users",
        icon: Users,
        path: "/dashboard/requestor/users",
      },
      {
        title: "Requests",
        icon: Shredder,
        path: "/dashboard/requestor/requests",
      },
      {
        title: "Audit Logs",
        icon: FileClock,
        path: "/dashboard/requestor/audit-logs",
        authorizedRoles: [RoleKeyEnum.ADMIN, RoleKeyEnum.OPERATOR],
      },
    ],
  },
];

export default NAV_ROUTES;
