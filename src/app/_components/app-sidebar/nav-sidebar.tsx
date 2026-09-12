import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { TNavSidebar } from "../../_types/nav-sidebar";

export function NavSidebar({ data }: { data: TNavSidebar[] }) {
  const pathName = usePathname();

  return (
    <SidebarGroup>
      {data.map((item) => (
        <SidebarMenu key={item.title} className="pb-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={item.title}
              isActive={pathName === item.path}
              className="w-full"
              render={<Link href={item.path} />}
            >
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      ))}
    </SidebarGroup>
  );
}
