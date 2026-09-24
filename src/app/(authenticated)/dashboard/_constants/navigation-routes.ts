import type { TNavSidebar } from "@/app/(authenticated)/dashboard/_types/nav-sidebar";
import {
  BrainCircuit,
  CalendarDays,
  ClockFading,
  Coins,
  FileClock,
  Gauge,
  HandCoins,
  Medal,
  Scale,
  ShieldKeyhole,
  ShieldUser,
  Shredder,
  Swords,
  Users,
  UserShield,
} from "lucide-react";
import { PermissionEnum } from "@/common/enums/permission";
import { NavSidebarVariantEnum } from "@/app/(authenticated)/dashboard/_enums/nav-sidebar-variant";

const NAV_ROUTES: TNavSidebar[] = [
  {
    title: "Dashboard",
    icon: Gauge,
    path: "/dashboard",
  },
  {
    title: "Board",
    variant: NavSidebarVariantEnum.LABEL,
    authorizedPermissions: [PermissionEnum.PLAYER_BOARD_VIEW],
    children: [
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
        icon: Scale,
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
            authorizedPermissions: [PermissionEnum.USERS_VIEW],
          },
          {
            title: "Roles",
            icon: UserShield,
            path: "/dashboard/master/iam/roles",
            authorizedPermissions: [PermissionEnum.ROLES_VIEW],
          },
          {
            title: "Permissions",
            icon: ShieldKeyhole,
            path: "/dashboard/master/iam/permissions",
            authorizedPermissions: [PermissionEnum.PERMISSIONS_VIEW],
          },
        ],
      },
      {
        title: "Stories",
        icon: Swords,
        path: "/dashboard/master/stories",
        authorizedPermissions: [PermissionEnum.STORIES_VIEW],
      },
      {
        title: "Events",
        icon: CalendarDays,
        path: "/dashboard/master/events",
        authorizedPermissions: [PermissionEnum.EVENTS_VIEW],
      },
      {
        title: "Goods",
        icon: Scale,
        path: "/dashboard/master/goods",
        authorizedPermissions: [PermissionEnum.GOODS_VIEW],
      },
      {
        title: "Transactions",
        icon: HandCoins,
        children: [
          {
            title: "Experience Points",
            icon: Medal,
            path: "/dashboard/master/transactions/experience-points",
            authorizedPermissions: [PermissionEnum.POINTS_VIEW],
          },
          {
            title: "Gold Pieces",
            icon: Coins,
            path: "/dashboard/master/transactions/gold-pieces",
            authorizedPermissions: [PermissionEnum.POINTS_VIEW],
          },
        ],
      },
    ],
  },
];

export default NAV_ROUTES;
