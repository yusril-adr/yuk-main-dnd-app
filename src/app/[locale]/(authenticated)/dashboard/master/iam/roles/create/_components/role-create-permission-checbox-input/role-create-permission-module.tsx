"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { toSentenceCase, toTitleCase } from "@/utils/format-text";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ChevronDown } from "lucide-react";

import type { TRoleCreatePermissionModuleProps } from "../../_types/role-create-permission-module-props";

export default function RoleCreatePermissionModule({
  module,
  permissions,
  selectedPermissionIds,
  onPermissionChange,
  disabled,
}: TRoleCreatePermissionModuleProps) {
  const [moduleParent] = useAutoAnimate<HTMLDivElement>();

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    const nextPermissionIds = checked
      ? [...new Set([...selectedPermissionIds, permissionId])]
      : selectedPermissionIds.filter((id) => id !== permissionId);

    onPermissionChange(nextPermissionIds);
  };

  return (
    <Collapsible
      defaultOpen={false}
      className="group/collapsible rounded-md border"
      ref={moduleParent}
    >
      <CollapsibleTrigger
        className="flex w-full items-center justify-between px-4 py-3 font-medium"
        disabled={disabled}
      >
        <span>{toTitleCase(module)}</span>
        <ChevronDown className="size-4 transition-transform group-data-open/collapsible:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t px-4 py-3">
        <div className="flex flex-col gap-3">
          {permissions.map((permission) => (
            <label
              key={permission.id}
              className="flex items-center gap-2 text-sm"
            >
              <Checkbox
                checked={selectedPermissionIds.includes(permission.id)}
                disabled={disabled}
                onCheckedChange={(checked) =>
                  handlePermissionChange(permission.id, checked)
                }
              />
              <span>{toSentenceCase(permission.action)}</span>
            </label>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
