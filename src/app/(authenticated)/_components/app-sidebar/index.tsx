import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { LanguageSwitcher } from "@/app/_components/language-switcher";
import { ThemeToggler } from "@/app/_components/theme-toggler";
import type { TNavSidebar } from "@/app/(authenticated)/_types/nav-sidebar";
import { NavSidebar } from "./nav-sidebar";
import CONFIG from "@/common/constants/config";
import NAV_ROUTES from "@/app/(authenticated)/_constants/navigation-routes";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { AvatarSidebar } from "./avatar-sidebar";
import Link from "next/link";
import YmdndLogo from "@/assets/logo/YMDND1.svg";

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
            <div className="flex justify-between items-center gap-1 pl-1.5">
              <Link href="/" className="flex min-w-0 items-center gap-1.5">
                <YmdndLogo aria-hidden className="size-7 shrink-0 text-primary" />
                <span className="truncate font-heading text-xl">YukMainDnD</span>
              </Link>

              <div className="flex shrink-0 items-center">
                <LanguageSwitcher size="icon-sm" />
                {CONFIG.IS_USING_THEME_TOGGLER && <ThemeToggler size="icon-sm" />}
              </div>
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
