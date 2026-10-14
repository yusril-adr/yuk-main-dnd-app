import Link from "next/link";
import { usePathname } from "next/navigation";
import { Else, If, Then } from "react-if";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
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
              </Else>
            </If>
          </SidebarMenuItem>
        </SidebarMenu>
      ))}
    </SidebarGroup>
  );
}
