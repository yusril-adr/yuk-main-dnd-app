import Link from "next/link";
import { usePathname } from "next/navigation";
import { Else, If, Then } from "react-if";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";

import type { TNavSidebar } from "@/app/(authenticated)/_types/nav-sidebar";
import { NavCollapsibleMenu } from "./nav-collapsible-menu";

export function NavSidebar({ data }: { data: TNavSidebar[] }) {
  const pathName = usePathname();

  return (
    <SidebarGroup>
      {data.map((item) => (
        <If condition={item.children?.length} key={item.title}>
          <Then>
            <SidebarMenu key={item.title} className="pb-1">
              <SidebarMenuItem>
                <NavCollapsibleMenu item={item} />
              </SidebarMenuItem>
            </SidebarMenu>
          </Then>

          <Else>
            <SidebarMenu key={item.title} className="pb-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={pathName === item.path}
                  className="w-full"
                  render={<Link href={item.path!} />}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Else>
        </If>
      ))}
    </SidebarGroup>
  );
}
