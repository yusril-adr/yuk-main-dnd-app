import Link from "next/link";
import { FilePen, Send } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { Field, FieldGroup } from "@/app/_components/ui/field";
import { Spinner } from "@/app/_components/ui/spinner";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

import type { TStoryCreateFormActionsProps } from "@/app/(authenticated)/dashboard/master/stories/create/_types/story-create-form-actions-props";

export default function StoryCreateFormActions({
  cancelHref,
  disabled,
  isPending,
  submittingStatus,
  onSubmitWithStatus,
}: TStoryCreateFormActionsProps) {
  const isSubmitting = (status: StoryStatusEnum) =>
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
            Cancel
          </Button>

          <Button
            className="w-full sm:w-auto"
            type="button"
            variant="secondary"
            disabled={disabled}
            onClick={() => onSubmitWithStatus(StoryStatusEnum.DRAFT)}
          >
            <If condition={isSubmitting(StoryStatusEnum.DRAFT)}>
              <Then>
                <Spinner data-icon="inline-start" />
              </Then>
              <Else>
                <FilePen data-icon="inline-start" />
              </Else>
            </If>
            Save as Draft
          </Button>

          <Button
            className="w-full sm:w-auto"
            type="button"
            disabled={disabled}
            onClick={() => onSubmitWithStatus(StoryStatusEnum.PUBLISHED)}
          >
            <If condition={isSubmitting(StoryStatusEnum.PUBLISHED)}>
              <Then>
                <Spinner data-icon="inline-start" />
              </Then>
              <Else>
                <Send data-icon="inline-start" />
              </Else>
            </If>
            Publish
          </Button>
        </div>
      </Field>
    </FieldGroup>
  );
}
