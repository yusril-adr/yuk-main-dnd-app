import { useCallback, useEffect, useRef, useState } from "react";
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
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
import {
  SettingsPasswordFormSchema,
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
  const { control, handleSubmit, setError, reset } =
    useForm<TSettingsPasswordFormSchema>({
      resolver: zodResolver(SettingsPasswordFormSchema),
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
          <AlertDialogTitle>Change password</AlertDialogTitle>
          <AlertDialogDescription>
            Enter your current password and choose a new one. You will stay
            signed in after the change.
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
                  <FieldLabel htmlFor="currentPassword">
                    Current password
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="currentPassword"
                      type={isShowCurrentPassword ? "text" : "password"}
                      placeholder="Current password"
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
                  <FieldLabel htmlFor="newPassword">New password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="newPassword"
                      type={isShowNewPassword ? "text" : "password"}
                      placeholder="New password"
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
                    At least 8 characters, with uppercase, lowercase, a number,
                    and a symbol.
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
                  <FieldLabel htmlFor="newPasswordConfirmation">
                    Confirm new password
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="newPasswordConfirmation"
                      type={isShowConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
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
              Cancel
            </AlertDialogCancel>
            <Button type="submit" disabled={isPending}>
              <If condition={isPending}>
                <Then>
                  <Spinner data-icon="inline-start" />
                </Then>
              </If>
              Update
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
