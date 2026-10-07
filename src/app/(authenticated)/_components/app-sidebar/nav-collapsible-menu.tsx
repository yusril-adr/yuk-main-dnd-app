import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Else, If, Then } from "react-if";
import { ChevronDown } from "lucide-react";

import {
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/app/_components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";
import { cn } from "@/utils/cn";

import type { TNavSidebar } from "@/app/(authenticated)/_types/nav-sidebar";

export function NavCollapsibleMenu({ item }: { item: TNavSidebar }) {
  const pathName = usePathname();
  const childrenPathNames = item.children?.map((child) => child.path);
  const isDefaultOpen = childrenPathNames?.some((path) =>
    path ? pathName.startsWith(path) : false,
  );
  const [open, setOpen] = useState(isDefaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen} key={item.title}>
      <CollapsibleTrigger
        className="w-full"
        render={<SidebarMenuButton tooltip={item.title} />}
      >
        {item.icon && <item.icon />}
        <span>{item.title}</span>
        <ChevronDown
          className={cn("ml-auto transition-transform", open && "rotate-180")}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.children?.map((child) => (
            <NavSubItem key={child.title} item={child} />
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
}

function NavSubItem({ item }: { item: TNavSidebar }) {
  const pathName = usePathname();

  return (
    <If condition={item.children?.length}>
      <Then>
        <NestedCollapsible item={item} />
      </Then>
      <Else>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton
            isActive={pathName === item.path}
            render={
              <Link
                href={item.path!}
                className="[&>svg]:text-sidebar-foreground! hover:[&>svg]:text-sidebar-accent-foreground!"
              />
            }
          >
            {item.icon && <item.icon />}
            {item.title}
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </Else>
    </If>
  );
}

function NestedCollapsible({ item }: { item: TNavSidebar }) {
  const pathName = usePathname();
  const childrenPathNames = item.children?.map((child) => child.path);
  const isDefaultOpen = childrenPathNames?.some((path) =>
    path ? pathName.startsWith(path) : false,
  );
  const [open, setOpen] = useState(isDefaultOpen);

  return (
    <SidebarMenuSubItem>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger
          className="w-full"
          render={<SidebarMenuButton tooltip={item.title} />}
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          <ChevronDown
            className={cn("ml-auto transition-transform", open && "rotate-180")}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children?.map((child) => (
              <NavSubItem key={child.title} item={child} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuSubItem>
  );
}
