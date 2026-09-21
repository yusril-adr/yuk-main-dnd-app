import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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

import { TNavSidebar } from "@/app/(authenticated)/_types/nav-sidebar";

export function NavCollapsibleMenu({ item }: { item: TNavSidebar }) {
  const pathName = usePathname();
  const childrenPathNames = item.children?.map((child) => child.path);
  const isDefaultOpen = childrenPathNames?.some((path) =>
    path ? pathName.startsWith(path) : false,
  );

  const [open, setOpen] = useState(isDefaultOpen);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="group"
      key={item.title}
    >
      <CollapsibleTrigger
        className="w-full"
        render={<SidebarMenuButton tooltip={item.title} />}
      >
        <item.icon />
        <span>{item.title}</span>
        <ChevronDown className="ml-auto transition-transform group-data-[open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.children?.map((child) => (
            <SidebarMenuSubItem key={child.title}>
              <SidebarMenuSubButton
                isActive={pathName === child.path}
                render={<Link href={child.path!} />}
              >
                {child.title}
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
}
