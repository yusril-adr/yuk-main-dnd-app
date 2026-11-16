import type { TEventCreateStatus } from "@/app/(authenticated)/dashboard/master/events/create/_types/event-create-status";
import Link from "next/link";
import { FilePen, Send } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { Field, FieldGroup } from "@/app/_components/ui/field";
import { Spinner } from "@/app/_components/ui/spinner";
import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_EVENTS_CREATE_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/create/_messages";

import type { TEventCreateFormActionsProps } from "@/app/(authenticated)/dashboard/master/events/create/_types/event-create-form-actions-props";

export default function EventCreateFormActions({
  cancelHref,
  disabled,
  isPending,
  submittingStatus,
  onSubmitWithStatus,
}: TEventCreateFormActionsProps) {
  const { t } = useT(MASTER_EVENTS_CREATE_MESSAGES);
  const isSubmitting = (status: TEventCreateStatus) =>
    isPending && submittingStatus === status;

  return (
    <FieldGroup>
      {/* Phones: full-width stacked buttons. sm+: one row, buttons right */}
      <Field
        orientation="horizontal"
        className="flex-col items-stretch sm:flex-row sm:items-center"
      >
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
            variant="secondary"
            disabled={disabled}
            onClick={() => onSubmitWithStatus(EventStatusEnum.DRAFT)}
          >
            <If condition={isSubmitting(EventStatusEnum.DRAFT)}>
              <Then>
                <Spinner data-icon="inline-start" />
              </Then>
              <Else>
                <FilePen data-icon="inline-start" />
              </Else>
            </If>
            {t("actions.saveAsDraft")}
          </Button>

          <Button
            className="w-full sm:w-auto"
            type="button"
            disabled={disabled}
            onClick={() => onSubmitWithStatus(EventStatusEnum.PUBLISHED)}
          >
            <If condition={isSubmitting(EventStatusEnum.PUBLISHED)}>
              <Then>
                <Spinner data-icon="inline-start" />
              </Then>
              <Else>
                <Send data-icon="inline-start" />
              </Else>
            </If>
            {t("actions.publish")}
          </Button>
        </div>
      </Field>
    </FieldGroup>
  );
}
