"use client";

import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { If, Then } from "react-if";

import type { TGuestUserCreatePayload } from "@/api/main/modules/master/iam/users/guests/types/guest-user-create-payload";
import MainAPIValidationError from "@/api/main/errors/validation-error";
import RequiredFieldLabel from "@/app/_components/required-field-label";
import { Button } from "@/app/_components/ui/button";
import { DialogFooter } from "@/app/_components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/[id]/_messages";
import type { TStoryDetailCreateGuestFormProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-create-guest-form-props";
import { toCamelCase } from "@/utils/format-text";
import { applyValidationErrors } from "@/utils/validation-helper";

import {
  createStoryDetailCreateGuestFormSchema,
  type TStoryDetailCreateGuestFormSchema,
} from "./scheme";

export default function StoryDetailCreateGuestForm({
  defaultDisplayName = "",
  isPending,
  mutationError,
  onCancel,
  onSubmitPayload,
}: TStoryDetailCreateGuestFormProps) {
  const { t } = useT(MASTER_STORY_DETAIL_MESSAGES);
  const schema = useMemo(
    () => createStoryDetailCreateGuestFormSchema(t),
    [t],
  );

  const form = useForm<TStoryDetailCreateGuestFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      displayName: defaultDisplayName.trim(),
    },
  });

  useEffect(() => {
    if (!(mutationError instanceof MainAPIValidationError)) return;
    const mappedErrors = mutationError.errors.map((error) => ({
      property: toCamelCase(String(error.property)),
      messages: error.messages,
    }));
    applyValidationErrors(form.setError, mappedErrors);
  }, [form.setError, mutationError]);

  function handleSubmit(values: TStoryDetailCreateGuestFormSchema) {
    const payload: TGuestUserCreatePayload = {
      username: values.username,
      display_name: values.displayName.trim(),
    };
    onSubmitPayload(payload);
  }

  return (
    <form
      id="story-detail-create-guest-form"
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(handleSubmit)}
      noValidate
    >
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <RequiredFieldLabel
                required
                htmlFor="story-create-guest-username"
              >
                {t("createGuest.username")}
              </RequiredFieldLabel>
              <Input
                {...field}
                id="story-create-guest-username"
                placeholder={t("createGuest.usernamePlaceholder")}
                autoComplete="off"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="displayName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <RequiredFieldLabel
                required
                htmlFor="story-create-guest-display-name"
              >
                {t("createGuest.displayName")}
              </RequiredFieldLabel>
              <Input
                {...field}
                id="story-create-guest-display-name"
                placeholder={t("createGuest.displayNamePlaceholder")}
                autoComplete="off"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>

      <DialogFooter className="gap-2 sm:gap-0">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={onCancel}
        >
          {t("createGuest.cancel")}
        </Button>
        <Button type="submit" disabled={isPending}>
          <If condition={isPending}>
            <Then>
              <LoaderCircleIcon
                data-icon="inline-start"
                className="animate-spin"
              />
            </Then>
          </If>
          {t("createGuest.submit")}
        </Button>
      </DialogFooter>
    </form>
  );
}
