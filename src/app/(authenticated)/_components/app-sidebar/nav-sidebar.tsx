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
import { NavSidebarVariantEnum } from "@/app/(authenticated)/_enums/nav-sidebar-variant";
import { NavCollapsibleMenu } from "./nav-collapsible-menu";
import { NavLabelGroup } from "./nav-label-group";

export function NavSidebar({ data }: { data: TNavSidebar[] }) {
  const pathName = usePathname();

  const menuItems = data.filter(
    (item) => item.variant !== NavSidebarVariantEnum.LABEL,
  );
  const labelItems = data.filter(
    (item) => item.variant === NavSidebarVariantEnum.LABEL,
  );

  return (
    <>
      <If condition={menuItems.length}>
        <Then>
          <SidebarGroup>
            {menuItems.map((item) => (
              <SidebarMenu key={item.title} className="pb-1">
                <SidebarMenuItem>
                  <If condition={item.children?.length}>
                    <Then>
                      <NavCollapsibleMenu item={item} />
                    </Then>
                    <Else>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathName === item.path}
                        className="w-full"
                        render={<Link href={item.path!} />}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Else>
                  </If>
                </SidebarMenuItem>
              </SidebarMenu>
            ))}
          </SidebarGroup>
        </Then>
      </If>

      <If condition={labelItems.length}>
        <Then>
          {labelItems.map((item) => (
            <NavLabelGroup key={item.title} item={item} />
          ))}
        </Then>
      </If>
    </>
  );
}
