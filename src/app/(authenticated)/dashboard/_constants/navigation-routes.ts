import type { TNavSidebar } from "@/app/(authenticated)/dashboard/_types/nav-sidebar";
import {
  BrainCircuit,
  CalendarDays,
  FileClock,
  Gauge,
  ShieldKeyhole,
  ShieldUser,
  Shredder,
  Swords,
  Trophy,
  Users,
  UserShield,
} from "lucide-react";
import { RoleKeyEnum } from "@/common/enums/role-key";
import { NavSidebarVariantEnum } from "@/app/(authenticated)/dashboard/_enums/nav-sidebar-variant";

const NAV_ROUTES: TNavSidebar[] = [
  {
    title: "Board",
    variant: NavSidebarVariantEnum.LABEL,
    children: [
      {
        title: "Dashboard",
        icon: Gauge,
        path: "/dashboard",
      },
      {
        title: "Stories",
        icon: Swords,
        path: "/dashboard/stories",
      },
      {
        title: "Events",
        icon: CalendarDays,
        path: "/dashboard/events",
      },
      {
        title: "Rewards",
        icon: Trophy,
        path: "/dashboard/rewards",
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
    ],
  },
  {
    title: "Master",
    variant: NavSidebarVariantEnum.LABEL,
    children: [
      {
        title: "IAM",
        icon: ShieldUser,
        children: [
          {
            title: "Users",
            icon: Users,
            path: "/dashboard/master/iam/users",
          },
          {
            title: "Roles",
            icon: UserShield,
            path: "/dashboard/master/iam/roles",
          },
          {
            title: "Permissions",
            icon: ShieldKeyhole,
            path: "/dashboard/master/iam/permissions",
          },
        ],
      },
      {
        title: "Stories",
        icon: Swords,
        path: "/dashboard/master/stories",
      },
      {
        title: "Events",
        icon: CalendarDays,
        path: "/dashboard/master/events",
      },
      {
        title: "Rewards",
        icon: Trophy,
        path: "/dashboard/master/rewards",
      },
    ],
  },
];

export default NAV_ROUTES;
