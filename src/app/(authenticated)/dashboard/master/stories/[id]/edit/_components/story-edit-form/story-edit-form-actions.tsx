import Link from "next/link";
import { Save } from "lucide-react";
import { If, Then, Else } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { Field, FieldGroup } from "@/app/_components/ui/field";
import { Spinner } from "@/app/_components/ui/spinner";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import StoryStatusBadge from "@/app/(authenticated)/dashboard/master/stories/_components/story-status-badge";

import type { TStoryEditFormActionsProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/edit/_types/story-edit-form-actions-props";

export default function StoryEditFormActions({
  cancelHref,
  disabled,
  isPending,
  currentStatus,
  onSave,
}: TStoryEditFormActionsProps) {
  return (
    <FieldGroup>
      <Field
        orientation="horizontal"
        className="flex-col items-stretch sm:flex-row sm:items-center"
      >
        <If condition={!!currentStatus}>
          <Then>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              Current status:
              <StoryStatusBadge status={currentStatus as StoryStatusEnum} />
            </span>
          </Then>
        </If>
        <div className="flex flex-col gap-3 sm:ms-auto sm:flex-row">
          <Button
            className="w-full sm:w-auto"
            variant="outline"
            type="button"
            render={<Link href={cancelHref} />}
            disabled={disabled}
            nativeButton={false}
          >
            Cancel
          </Button>
          <Button
            className="w-full sm:w-auto"
            type="button"
            disabled={disabled}
            onClick={onSave}
          >
            <If condition={isPending}>
              <Then>
                <Spinner data-icon="inline-start" />
              </Then>
              <Else>
                <Save data-icon="inline-start" />
              </Else>
            </If>
            Save
          </Button>
        </div>
      </Field>
    </FieldGroup>
  );
}
