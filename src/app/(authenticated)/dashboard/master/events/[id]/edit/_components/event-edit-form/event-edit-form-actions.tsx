import Link from "next/link";
import { Save } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { Field, FieldGroup } from "@/app/_components/ui/field";
import { Spinner } from "@/app/_components/ui/spinner";
import EventStatusBadge from "@/app/(authenticated)/dashboard/master/events/_components/event-status-badge";
import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_EVENTS_EDIT_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/[id]/edit/_messages";

import type { TEventEditFormActionsProps } from "@/app/(authenticated)/dashboard/master/events/[id]/edit/_types/event-edit-form-actions-props";

const STATUS_MESSAGE_KEY = {
  [EventStatusEnum.DRAFT]: "enums.status.draft",
  [EventStatusEnum.PUBLISHED]: "enums.status.published",
  [EventStatusEnum.ARCHIVED]: "enums.status.archived",
  [EventStatusEnum.CANCELLED]: "enums.status.cancelled",
  [EventStatusEnum.COMPLETED]: "enums.status.completed",
} as const;

export default function EventEditFormActions({
  cancelHref,
  disabled,
  isPending,
  currentStatus,
  onSave,
}: TEventEditFormActionsProps) {
  const { t } = useT(MASTER_EVENTS_EDIT_MESSAGES);
  const statusLabel =
    currentStatus != null
      ? t(STATUS_MESSAGE_KEY[currentStatus as EventStatusEnum])
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
              <EventStatusBadge
                status={currentStatus as EventStatusEnum}
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
