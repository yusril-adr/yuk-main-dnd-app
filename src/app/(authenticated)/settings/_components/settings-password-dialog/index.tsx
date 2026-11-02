import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Else, If, Then } from "react-if";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import RequiredFieldLabel from "@/app/_components/required-field-label";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/app/_components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import { Button } from "@/app/_components/ui/button";
import { Spinner } from "@/app/_components/ui/spinner";

import MainAPIValidationError from "@/api/main/errors/validation-error";
import { applyValidationErrors } from "@/utils/validation-helper";
import { toCamelCase } from "@/utils/format-text";
import { useT } from "@/app/_hooks/use-t";

import { SETTINGS_MESSAGES } from "../../_messages";
import {
  createSettingsPasswordFormSchema,
  type TSettingsPasswordFormSchema,
} from "./scheme";
import type { TSettingsPasswordDialogProps } from "../../_types/settings-password-dialog-props";

export default function SettingsPasswordDialog({
  open,
  onOpenChange,
  onSubmitPayload,
  mutationError,
  isPending,
}: TSettingsPasswordDialogProps) {
  const { t } = useT(SETTINGS_MESSAGES);
  const schema = useMemo(() => createSettingsPasswordFormSchema(t), [t]);

  const { control, handleSubmit, setError, reset } =
    useForm<TSettingsPasswordFormSchema>({
      resolver: zodResolver(schema),
      defaultValues: {
        currentPassword: "",
        newPassword: "",
        newPasswordConfirmation: "",
      },
    });

  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        reset();
        setIsShowCurrentPassword(false);
        setIsShowNewPassword(false);
        setIsShowConfirmPassword(false);
      }
      onOpenChange(nextOpen);
    },
    [reset, onOpenChange],
  );

  const prevIsPending = useRef(isPending);

  useEffect(() => {
    if (prevIsPending.current && !isPending && !mutationError) {
      handleOpenChange(false);
    }
    prevIsPending.current = isPending;
  }, [isPending, mutationError, handleOpenChange]);

  useEffect(() => {
    if (mutationError instanceof MainAPIValidationError) {
      const mappedErrors = mutationError.errors.map((error) => ({
        property: toCamelCase(String(error.property)),
        messages: error.messages,
      }));
      applyValidationErrors(setError, mappedErrors);
    }
  }, [mutationError, setError]);

  const onSubmit: SubmitHandler<TSettingsPasswordFormSchema> = (data) => {
    onSubmitPayload({
      current_password: data.currentPassword,
      new_password: data.newPassword,
      new_password_confirmation: data.newPasswordConfirmation,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("password.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("password.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Nested form: Enter here must not submit the profile form */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleSubmit(onSubmit)(event);
          }}
        >
          <FieldGroup>
            <Controller
              name="currentPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <RequiredFieldLabel required htmlFor="currentPassword">
                    {t("password.currentPassword")}
                  </RequiredFieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      aria-required
                      id="currentPassword"
                      type={isShowCurrentPassword ? "text" : "password"}
                      placeholder={t("password.currentPasswordPlaceholder")}
                      autoComplete="current-password"
                      disabled={isPending}
                      {...field}
                    />
                    <InputGroupAddon align="inline-end">
                      <button
                        className="btn btn-ghost btn-square btn-sm"
                        type="button"
                        onClick={() =>
                          setIsShowCurrentPassword(!isShowCurrentPassword)
                        }
                      >
                        <If condition={isShowCurrentPassword}>
                          <Then>
                            <EyeOffIcon />
                          </Then>
                          <Else>
                            <EyeIcon />
                          </Else>
                        </If>
                      </button>
                    </InputGroupAddon>
                  </InputGroup>
                  <If condition={fieldState.invalid}>
                    <Then>
                      <FieldError errors={[fieldState.error]} />
                    </Then>
                  </If>
                </Field>
              )}
            />

            <Controller
              name="newPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <RequiredFieldLabel required htmlFor="newPassword">
                    {t("password.newPassword")}
                  </RequiredFieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      aria-required
                      id="newPassword"
                      type={isShowNewPassword ? "text" : "password"}
                      placeholder={t("password.newPasswordPlaceholder")}
                      autoComplete="new-password"
                      disabled={isPending}
                      {...field}
                    />
                    <InputGroupAddon align="inline-end">
                      <button
                        className="btn btn-ghost btn-square btn-sm"
                        type="button"
                        onClick={() => setIsShowNewPassword(!isShowNewPassword)}
                      >
                        <If condition={isShowNewPassword}>
                          <Then>
                            <EyeOffIcon />
                          </Then>
                          <Else>
                            <EyeIcon />
                          </Else>
                        </If>
                      </button>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    {t("password.passwordHint")}
                  </FieldDescription>
                  <If condition={fieldState.invalid}>
                    <Then>
                      <FieldError errors={[fieldState.error]} />
                    </Then>
                  </If>
                </Field>
              )}
            />

            <Controller
              name="newPasswordConfirmation"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <RequiredFieldLabel
                    required
                    htmlFor="newPasswordConfirmation"
                  >
                    {t("password.confirmPassword")}
                  </RequiredFieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      aria-required
                      id="newPasswordConfirmation"
                      type={isShowConfirmPassword ? "text" : "password"}
                      placeholder={t("password.confirmPasswordPlaceholder")}
                      autoComplete="new-password"
                      disabled={isPending}
                      {...field}
                    />
                    <InputGroupAddon align="inline-end">
                      <button
                        className="btn btn-ghost btn-square btn-sm"
                        type="button"
                        onClick={() =>
                          setIsShowConfirmPassword(!isShowConfirmPassword)
                        }
                      >
                        <If condition={isShowConfirmPassword}>
                          <Then>
                            <EyeOffIcon />
                          </Then>
                          <Else>
                            <EyeIcon />
                          </Else>
                        </If>
                      </button>
                    </InputGroupAddon>
                  </InputGroup>
                  <If condition={fieldState.invalid}>
                    <Then>
                      <FieldError errors={[fieldState.error]} />
                    </Then>
                  </If>
                </Field>
              )}
            />
          </FieldGroup>

          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel type="button" disabled={isPending}>
              {t("password.cancel")}
            </AlertDialogCancel>
            <Button type="submit" disabled={isPending}>
              <If condition={isPending}>
                <Then>
                  <Spinner data-icon="inline-start" />
                </Then>
              </If>
              {t("password.update")}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
