import type { TNavSidebar } from "@/app/(authenticated)/dashboard/_types/nav-sidebar";
import {
  Anvil,
  BrainCircuit,
  CalendarDays,
  ClockFading,
  Coins,
  FileClock,
  Gauge,
  HandCoins,
  Medal,
  ShieldKeyhole,
  ShieldUser,
  Shredder,
  Swords,
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
        title: "Goods",
        icon: Anvil,
        path: "/dashboard/goods",
      },
      {
        title: "Point Logs",
        icon: ClockFading,
        children: [
          {
            title: "Experience Points",
            icon: Medal,
            path: "/dashboard/logs/experience-points",
          },
          {
            title: "Gold Pieces",
            icon: Coins,
            path: "/dashboard/logs/gold-pieces",
          },
        ],
      },
      {
        title: "Requestor",
        icon: BrainCircuit,
        children: [
          {
            title: "Dashboard",
            icon: Gauge,
            path: "/dashboard/requestor",
          },
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
        title: "Goods",
        icon: Anvil,
        path: "/dashboard/master/goods",
      },
      {
        title: "Transactions",
        icon: HandCoins,
        children: [
          {
            title: "Experience Points",
            icon: Medal,
            path: "/dashboard/master/transactions/experience-points",
          },
          {
            title: "Gold Pieces",
            icon: Coins,
            path: "/dashboard/master/transactions/gold-pieces",
          },
        ],
      },
    ],
  },
];

export default NAV_ROUTES;
