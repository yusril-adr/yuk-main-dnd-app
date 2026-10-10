"use client";

import { useCallback, useEffect, useRef } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { BookOpen, ChessKnight, type LucideIcon } from "lucide-react";
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { Spinner } from "@/app/_components/ui/spinner";
import { Textarea } from "@/app/_components/ui/textarea";
import { UserExpLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type";
import { USER_EXP_LOG_TYPE_LABEL } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type-label";
import MainAPIValidationError from "@/api/main/errors/validation-error";
import { toCamelCase } from "@/utils/format-text";
import { applyValidationErrors } from "@/utils/validation-helper";

import type { TAddUserExperiencePointsDialogProps } from "../../_types/add-user-experience-points-dialog-props";
import {
  AddUserExperiencePointsFormSchema,
  type TAddUserExperiencePointsFormSchema,
} from "./scheme";

const TYPE_OPTIONS: {
  value: UserExpLogTypeEnum;
  label: string;
  icon: LucideIcon;
}[] = [
  {
    value: UserExpLogTypeEnum.PLAYER,
    label: USER_EXP_LOG_TYPE_LABEL[UserExpLogTypeEnum.PLAYER],
    icon: ChessKnight,
  },
  {
    value: UserExpLogTypeEnum.DM,
    label: USER_EXP_LOG_TYPE_LABEL[UserExpLogTypeEnum.DM],
    icon: BookOpen,
  },
];

export default function AddUserExperiencePointsDialog({
  open,
  onOpenChange,
  onSubmitPayload,
  mutationError,
  isPending,
}: TAddUserExperiencePointsDialogProps) {
  const { control, handleSubmit, setError, reset } =
    useForm<TAddUserExperiencePointsFormSchema>({
      resolver: zodResolver(AddUserExperiencePointsFormSchema),
      defaultValues: {
        type: UserExpLogTypeEnum.PLAYER,
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

  const onSubmit: SubmitHandler<TAddUserExperiencePointsFormSchema> = (
    data,
  ) => {
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
          <AlertDialogTitle>Add experience points</AlertDialogTitle>
          <AlertDialogDescription>
            Credit player EXP or DM EXP. The amount is added and cannot be
            negative.
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
                  <FieldLabel>Type</FieldLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {TYPE_OPTIONS.map((option) => (
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
                  <FieldLabel htmlFor="experience-amount">Amount</FieldLabel>
                  <Input
                    id="experience-amount"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    step={1}
                    placeholder="1"
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
                  <FieldLabel htmlFor="experience-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    id="experience-description"
                    placeholder="Optional"
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
              Cancel
            </AlertDialogCancel>
            <Button type="submit" disabled={isPending}>
              <If condition={isPending}>
                <Then>
                  <Spinner data-icon="inline-start" />
                </Then>
              </If>
              Add
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
