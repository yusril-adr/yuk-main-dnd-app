import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { Sword } from "lucide-react";
import { ThemeToggler } from "@/app/_components/theme-toggler";
import type { TNavSidebar } from "@/app/(authenticated)/dashboard/_types/nav-sidebar";
import { NavSidebar } from "./nav-sidebar";
import CONFIG from "@/common/constants/config";
import NAV_ROUTES from "@/app/(authenticated)/dashboard/_constants/navigation-routes";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { AvatarSidebar } from "./avatar-sidebar";
import Link from "next/link";

export function AppSidebar() {
  const { auth } = useAuthContext();

  const isAuthorized = (item: TNavSidebar) => {
    const isAuthorizedByRole =
      !item.authorizedRoles?.length ||
      (auth?.selected_role != null &&
        item.authorizedRoles.includes(auth.selected_role.key));

    const isAuthorizedByPermission =
      !item.authorizedPermissions?.length ||
      item.authorizedPermissions.some((permission) =>
        auth?.permissions.includes(permission),
      );

    return isAuthorizedByRole && isAuthorizedByPermission;
  };

  const filterNavItems = (items: TNavSidebar[]): TNavSidebar[] =>
    items.flatMap((item) => {
      if (!isAuthorized(item)) return [];

      if (item.children) {
        const children = filterNavItems(item.children);
        return children.length > 0 ? [{ ...item, children }] : [];
      }

      return [item];
    });

  const navItems: TNavSidebar[] = filterNavItems(NAV_ROUTES);

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex justify-between items-center pl-1.5">
              <Link href="/" className="flex items-center">
                <Sword className="mr-2" />
                <span className="font-heading text-2xl ">YukMainDnD</span>
              </Link>

              {CONFIG.IS_USING_THEME_TOGGLER && <ThemeToggler />}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavSidebar data={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <AvatarSidebar />
      </SidebarFooter>
    </Sidebar>
  );
}
