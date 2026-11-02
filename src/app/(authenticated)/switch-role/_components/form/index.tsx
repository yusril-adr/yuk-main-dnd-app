"use client";

import { useEffect, useMemo } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Else, If, Then } from "react-if";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import RequiredFieldLabel from "@/app/_components/required-field-label";
import {
  Field,
  FieldDescription,
  FieldError,
} from "@/app/_components/ui/field";
import { Spinner } from "@/app/_components/ui/spinner";

import type { TMainApiErrorResponse } from "@/api/main/types/response";
import type { TSwitchRolePayload } from "@/api/main/modules/auth/switch-role/types/switch-role-payload";
import type { TSwitchRoleFormProps } from "@/app/(authenticated)/switch-role/_types/switch-role-form-props";
import { createSwitchFormSchema, type TSwitchFormSchema } from "./scheme";
import { applyValidationErrors } from "@/utils/validation-helper";
import MainAPIValidationError from "@/api/main/errors/validation-error";
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";
import { useT } from "@/app/_hooks/use-t";
import { SWITCH_ROLE_MESSAGES } from "@/app/(authenticated)/switch-role/_messages";

export function SwitchRoleForm({
  user,
  onSubmitPayload,
  mutationError,
  isPending,
  isPaused,
}: TSwitchRoleFormProps) {
  const { t } = useT(SWITCH_ROLE_MESSAGES);
  const roles = user.roles ?? [];

  const schema = useMemo(() => createSwitchFormSchema(t), [t]);

  const { control, handleSubmit, setError } = useForm<TSwitchFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { role: user.selected_role?.key ?? roles[0]?.key ?? "" },
  });

  useEffect(() => {
    if (mutationError instanceof MainAPIValidationError) {
      applyValidationErrors(
        setError,
        mutationError.errors as TMainApiErrorResponse<null>[],
      );
    }
  }, [mutationError, setError]);

  const onSubmit: SubmitHandler<TSwitchFormSchema> = (data) => {
    const payload: TSwitchRolePayload = {
      role_key: data.role,
    };
    onSubmitPayload(payload);
  };

  const isFormDisabled = useMemo(
    () => isPending || isPaused || roles.length === 0,
    [isPaused, isPending, roles.length],
  );

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className="items-center text-center">
          <div className="flex w-full justify-center items-center">
            <Avatar className="h-24 w-24 rounded-full">
              <AvatarImage
                src={user.avatar_url ?? makeDefaultAvatarUrl(user.display_name)}
                alt={user.display_name}
              />
              <AvatarFallback>{getInitials(user.display_name)}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle>{user.display_name}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <Controller
            name="role"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="grid gap-2" data-invalid={fieldState.invalid}>
                <RequiredFieldLabel required htmlFor="role">
                  {t("role")}
                </RequiredFieldLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value ?? "")}
                  disabled={isFormDisabled}
                >
                  <SelectTrigger aria-required id="role" className="w-full">
                    <SelectValue placeholder={t("rolePlaceholder")}>
                      {(value: string | null) =>
                        roles.find((role) => role.key === value)?.name ??
                        t("rolePlaceholder")
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {roles.map((role) => (
                        <SelectItem key={role.key} value={role.key}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {roles.length === 0 && (
                  <FieldDescription>{t("noRoles")}</FieldDescription>
                )}

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={isFormDisabled}>
            <If condition={isPending || isPaused}>
              <Then>
                <Spinner />
              </Then>
              <Else>{t("submit")}</Else>
            </If>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
