import { Badge } from "@/app/_components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Else, If, Then } from "react-if";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";

import type { TNavSidebar } from "@/app/(authenticated)/dashboard/_types/nav-sidebar";
import { NavCollapsibleMenu } from "./nav-collapsible-menu";

export function NavLabelGroup({ item }: { item: TNavSidebar }) {
  const pathName = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
      {item.children?.map((child) => (
        <SidebarMenu key={child.title} className="pb-1">
          <SidebarMenuItem>
            <If condition={child.children?.length}>
              <Then>
                <NavCollapsibleMenu item={child} />
              </Then>
              <Else>
                <SidebarMenuButton
                  tooltip={child.title}
                  isActive={pathName === child.path}
                  className="w-full"
                  render={<Link href={child.path!} />}
                >
                  {child.icon && <child.icon />}
                  <span>{child.title}</span>
                </SidebarMenuButton>
                {child.badge && (
                  <SidebarMenuBadge>
                    <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
                      {child.badge}
                    </Badge>
                  </SidebarMenuBadge>
                )}
              </Else>
            </If>
          </SidebarMenuItem>
        </SidebarMenu>
      ))}
    </SidebarGroup>
  );
}
