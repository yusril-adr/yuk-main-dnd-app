"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { ArrowDownLeft, ArrowUpRight, type LucideIcon } from "lucide-react";
import { If, Then } from "react-if";
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
import { Button } from "@/app/_components/ui/button";
import RequiredFieldLabel from "@/app/_components/required-field-label";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { Spinner } from "@/app/_components/ui/spinner";
import { Textarea } from "@/app/_components/ui/textarea";
import { UserPointLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/points/enums/user-point-log-type";
import MainAPIValidationError from "@/api/main/errors/validation-error";
import { useT } from "@/app/_hooks/use-t";
import { toCamelCase } from "@/utils/format-text";
import { applyValidationErrors } from "@/utils/validation-helper";

import { MASTER_USERS_BALANCES_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/users/[id]/balances/_messages";
import type { TAddUserPointsDialogProps } from "../../_types/add-user-points-dialog-props";
import {
  createAddUserPointsFormSchema,
  type TAddUserPointsFormSchema,
} from "./scheme";

export default function AddUserPointsDialog({
  open,
  onOpenChange,
  onSubmitPayload,
  mutationError,
  isPending,
}: TAddUserPointsDialogProps) {
  const { t } = useT(MASTER_USERS_BALANCES_MESSAGES);
  const schema = useMemo(() => createAddUserPointsFormSchema(t), [t]);

  const typeOptions = useMemo(
    (): {
      value: UserPointLogTypeEnum;
      label: string;
      icon: LucideIcon;
    }[] => [
      {
        value: UserPointLogTypeEnum.INCOME,
        label: t("enums.pointType.income"),
        icon: ArrowDownLeft,
      },
      {
        value: UserPointLogTypeEnum.EXPENSE,
        label: t("enums.pointType.expense"),
        icon: ArrowUpRight,
      },
    ],
    [t],
  );

  const { control, handleSubmit, setError, reset } =
    useForm<TAddUserPointsFormSchema>({
      resolver: zodResolver(schema),
      defaultValues: {
        type: UserPointLogTypeEnum.INCOME,
        amount: "",
        description: "",
      },
    });

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        reset();
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

  const onSubmit: SubmitHandler<TAddUserPointsFormSchema> = (data) => {
    const amount = Number(data.amount);
    const description = data.description.trim();
    onSubmitPayload({
      type: data.type,
      amount,
      ...(description ? { description } : {}),
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("dialogs.goldTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("dialogs.goldDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* min/step must not block 0, -1, or 1.5 before Zod shows the field error */}
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleSubmit(onSubmit)(event);
          }}
        >
          <FieldGroup>
            <Controller
              name="type"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <RequiredFieldLabel required>
                    {t("dialogs.type")}
                  </RequiredFieldLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {typeOptions.map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant={
                          field.value === option.value ? "default" : "outline"
                        }
                        aria-pressed={field.value === option.value}
                        disabled={isPending}
                        onClick={() => field.onChange(option.value)}
                      >
                        <option.icon className="size-4 shrink-0" />
                        {option.label}
                      </Button>
                    ))}
                  </div>
                  <If condition={fieldState.invalid}>
                    <Then>
                      <FieldError errors={[fieldState.error]} />
                    </Then>
                  </If>
                </Field>
              )}
            />

            <Controller
              name="amount"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <RequiredFieldLabel required htmlFor="point-amount">
                    {t("dialogs.amount")}
                  </RequiredFieldLabel>
                  <Input
                    aria-required
                    id="point-amount"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    step={1}
                    placeholder={t("dialogs.amountPlaceholder")}
                    disabled={isPending}
                    className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    {...field}
                  />
                  <If condition={fieldState.invalid}>
                    <Then>
                      <FieldError errors={[fieldState.error]} />
                    </Then>
                  </If>
                </Field>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="point-description">
                    {t("dialogs.description")}
                  </FieldLabel>
                  <Textarea
                    id="point-description"
                    placeholder={t("dialogs.descriptionPlaceholder")}
                    disabled={isPending}
                    {...field}
                  />
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
              {t("dialogs.cancel")}
            </AlertDialogCancel>
            <Button type="submit" disabled={isPending}>
              <If condition={isPending}>
                <Then>
                  <Spinner data-icon="inline-start" />
                </Then>
              </If>
              {t("dialogs.add")}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
