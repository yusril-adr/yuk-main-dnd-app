import { useEffect, useMemo } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Button } from "@/app/_components/ui/button";
import { Spinner } from "@/app/_components/ui/spinner";

import MainAPIValidationError from "@/api/main/errors/validation-error";
import { applyValidationErrors } from "@/utils/validation-helper";
import { RoleEditFormSchema, type TRoleEditFormSchema } from "./scheme";
import type { TRoleEditFormProps } from "../../_types/role-edit-form-props";
import RoleEditPermissionChecboxInput from "../role-edit-permission-checbox-input";

export default function RoleEditForm({
  name,
  description,
  isShowInPublic,
  permissionIds,
  permissions,
  isLoading,
  isPermissionsLoading,
  onSubmitPayload,
  mutationError,
  isPending,
  isPaused,
}: TRoleEditFormProps) {
  const values = useMemo(
    () => ({
      name: name ?? "",
      description: description ?? "",
      isShowInPublic: isShowInPublic ?? true,
      permissionIds: permissionIds ?? [],
    }),
    [description, isShowInPublic, name, permissionIds],
  );

  const { control, handleSubmit, setError } = useForm<TRoleEditFormSchema>({
    resolver: zodResolver(RoleEditFormSchema),
    values,
  });

  useEffect(() => {
    if (mutationError instanceof MainAPIValidationError) {
      const mappedErrors = mutationError.errors.map((error) => ({
        property: String(
          error.property === "permission_ids"
            ? "permissionIds"
            : error.property === "is_show_in_public"
              ? "isShowInPublic"
              : error.property,
        ),
        messages: error.messages,
      }));

      applyValidationErrors(setError, mappedErrors);
    }
  }, [mutationError, setError]);

  const onSubmit: SubmitHandler<TRoleEditFormSchema> = (data) => {
    onSubmitPayload({
      name: data.name,
      description: data.description,
      is_show_in_public: data.isShowInPublic,
      permissionIds: data.permissionIds,
    });
  };

  const isFormDisabled =
    isPending || isPaused || isLoading || isPermissionsLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Input role name"
                    disabled={isFormDisabled}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    id="description"
                    placeholder="Input role description"
                    disabled={isFormDisabled}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="isShowInPublic"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <Checkbox
                    id="isShowInPublic"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    onBlur={field.onBlur}
                    disabled={isFormDisabled}
                  />
                  <FieldLabel htmlFor="isShowInPublic">
                    Show in public
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="permissionIds"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Permissions</FieldLabel>
                    <RoleEditPermissionChecboxInput
                      permissions={permissions}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isFormDisabled}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter className="border-t-1 pt-4">
          <FieldGroup>
            <Field orientation="horizontal">
              <Button
                className="ms-auto"
                variant="outline"
                type="reset"
                render={<Link href="/dashboard/master/iam/roles" />}
                disabled={isFormDisabled}
                nativeButton={false}
              >
                Cancel
                {isFormDisabled && <Spinner />}
              </Button>

              <Button type="submit" disabled={isFormDisabled}>
                Save
                {isFormDisabled && <Spinner />}
              </Button>
            </Field>
          </FieldGroup>
        </CardFooter>
      </Card>
    </form>
  );
}
