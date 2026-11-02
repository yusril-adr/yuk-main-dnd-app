import Link from "next/link";
import { Save } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { Field, FieldGroup } from "@/app/_components/ui/field";
import { Spinner } from "@/app/_components/ui/spinner";
import StoryStatusBadge from "@/app/(authenticated)/dashboard/master/stories/_components/story-status-badge";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_STORIES_EDIT_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/[id]/edit/_messages";

import type { TStoryEditFormActionsProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/edit/_types/story-edit-form-actions-props";

const STATUS_MESSAGE_KEY = {
  [StoryStatusEnum.DRAFT]: "enums.status.draft",
  [StoryStatusEnum.PUBLISHED]: "enums.status.published",
  [StoryStatusEnum.ARCHIVED]: "enums.status.archived",
  [StoryStatusEnum.CANCELLED]: "enums.status.cancelled",
  [StoryStatusEnum.COMPLETED]: "enums.status.completed",
} as const;

export default function StoryEditFormActions({
  cancelHref,
  disabled,
  isPending,
  currentStatus,
  onSave,
}: TStoryEditFormActionsProps) {
  const { t } = useT(MASTER_STORIES_EDIT_MESSAGES);
  const statusLabel =
    currentStatus != null
      ? t(STATUS_MESSAGE_KEY[currentStatus as StoryStatusEnum])
      : undefined;

  return (
    <FieldGroup>
      <Field
        orientation="horizontal"
        className="flex-col items-stretch sm:flex-row sm:items-center"
      >
        <If condition={!!currentStatus}>
          <Then>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              {t("actions.currentStatus")}
              <StoryStatusBadge
                status={currentStatus as StoryStatusEnum}
                label={statusLabel}
              />
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
            {t("actions.cancel")}
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
            {t("actions.save")}
          </Button>
        </div>
      </Field>
    </FieldGroup>
  );
}
