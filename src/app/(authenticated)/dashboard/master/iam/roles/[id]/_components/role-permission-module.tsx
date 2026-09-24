"use client";

import { Badge } from "@/app/_components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";
import type { TPermissionEntity } from "@/api/main/types/entities/iam/permission-entity";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ChevronDown } from "lucide-react";

type TRolePermissionModuleProps = {
  module: string;
  permissions: TPermissionEntity[];
};

const toSentenceCase = (value: string) =>
  value
    .replace(/[-_]+/g, " ")
    .toLowerCase()
    .replace(/^\w/, (character) => character.toUpperCase());

export default function RolePermissionModule({
  module,
  permissions,
}: TRolePermissionModuleProps) {
  const [moduleParent] = useAutoAnimate<HTMLDivElement>();
  const moduleTitle = module
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

  return (
    <Collapsible
      defaultOpen={false}
      className="group/collapsible rounded-md border"
      ref={moduleParent}
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 font-medium">
        <span>{moduleTitle}</span>
        <ChevronDown className="size-4 transition-transform group-data-open/collapsible:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {permissions.map((permission) => (
            <Badge key={permission.id} variant="outline">
              {toSentenceCase(permission.action)}
            </Badge>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
