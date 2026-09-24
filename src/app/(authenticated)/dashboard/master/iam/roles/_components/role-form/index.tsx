"use client";

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
import {
  Combobox,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
} from "@/app/_components/ui/combobox";
import { Button } from "@/app/_components/ui/button";
import { Spinner } from "@/app/_components/ui/spinner";

import type { TPermissionResponse } from "@/api/main/modules/master/iam/permissions/types/permission-response";
import MainAPIValidationError from "@/api/main/errors/validation-error";
import { applyValidationErrors } from "@/utils/validation-helper";
import {
  RoleFormSchema,
  type TRoleFormSchema,
} from "./scheme";
import type { TRoleFormProps } from "@/app/(authenticated)/dashboard/master/iam/roles/_types/role-form-props";

export default function RoleForm({
  initialValues,
  permissions,
  isLoading,
  isPermissionsLoading,
  onSubmitPayload,
  mutationError,
  isPending,
  isPaused,
}: TRoleFormProps) {
  const values = useMemo(
    () => ({
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
      permissionIds: initialValues?.permissionIds ?? [],
    }),
    [initialValues],
  );

  const { control, handleSubmit, setError } = useForm<TRoleFormSchema>({
    resolver: zodResolver(RoleFormSchema),
    values,
  });

  useEffect(() => {
    if (mutationError instanceof MainAPIValidationError) {
      const mappedErrors = mutationError.errors.map((error) => ({
        property: String(
          error.property === "permission_ids"
            ? "permissionIds"
            : error.property,
        ),
        messages: error.messages,
      }));

      applyValidationErrors(setError, mappedErrors);
    }
  }, [mutationError, setError]);

  const onSubmit: SubmitHandler<TRoleFormSchema> = (data) => {
    onSubmitPayload({
      name: data.name,
      description: data.description,
      permissionIds: data.permissionIds,
    });
  };

  const isFormDisabled = useMemo(
    () => isPending || isPaused || isLoading || isPermissionsLoading,
    [isLoading, isPaused, isPending, isPermissionsLoading],
  );

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
              name="permissionIds"
              control={control}
              render={({ field, fieldState }) => {
                const selectedPermissions = permissions.filter((permission) =>
                  field.value.includes(permission.id),
                );

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="permissions">Permissions</FieldLabel>
                    <Combobox<TPermissionResponse, true>
                      id="permissions"
                      multiple
                      items={permissions}
                      value={selectedPermissions}
                      disabled={isFormDisabled}
                      itemToStringLabel={(permission) => permission.key}
                      itemToStringValue={(permission) => permission.id}
                      isItemEqualToValue={(item, value) => item.id === value.id}
                      onValueChange={(value) => {
                        field.onChange(value.map((permission) => permission.id));
                      }}
                    >
                      <ComboboxChips>
                        {selectedPermissions.map((permission) => (
                          <ComboboxChip key={permission.id}>
                            {permission.key}
                          </ComboboxChip>
                        ))}
                        <ComboboxChipsInput placeholder="Select permissions" />
                      </ComboboxChips>
                      <ComboboxContent>
                        <ComboboxEmpty>No permissions found.</ComboboxEmpty>
                        <ComboboxList>
                          {(permission) => (
                            <ComboboxItem
                              key={permission.id}
                              value={permission}
                            >
                              <span>{permission.key}</span>
                              <span className="text-muted-foreground">
                                {permission.module} / {permission.action}
                              </span>
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
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
