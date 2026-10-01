"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { EyeOffIcon, EyeIcon, Upload, RotateCcwClock } from "lucide-react";
import { Else, If, Then } from "react-if";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
} from "@/app/_components/ui/combobox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "@/app/_components/ui/button";
import { Spinner } from "@/app/_components/ui/spinner";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";

import MainAPIValidationError from "@/api/main/errors/validation-error";
import { applyValidationErrors } from "@/utils/validation-helper";
import { UserEditFormSchema, type TUserEditFormSchema } from "./scheme";
import type { TUserEditFormProps } from "../../_types/user-edit-form-props";

export default function UserEditForm({
  roles,
  isRolesLoading,
  onRoleSearchChange,
  email,
  username,
  displayName,
  bio,
  avatarUrl,
  roleIds,
  isLoading,
  onSubmitPayload,
  mutationError,
  isPending,
  isPaused,
  onUploadAvatar,
  isUploadingAvatar,
  avatarFileId,
}: TUserEditFormProps) {
  const defaultValues = useMemo(
    () => ({
      email: email || "",
      password: "",
      username: username || "",
      displayName: displayName || "",
      avatarFileId: avatarFileId || "",
      bio: bio || "",
      roleIds: roleIds || [],
    }),
    [email, username, displayName, bio, avatarFileId, roleIds],
  );

  const { control, handleSubmit, setError, setValue } =
    useForm<TUserEditFormSchema>({
      resolver: zodResolver(UserEditFormSchema),
      values: defaultValues,
    });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (avatarFileId) {
      setValue("avatarFileId", avatarFileId);
    }
  }, [avatarFileId, setValue]);

  useEffect(() => {
    if (mutationError instanceof MainAPIValidationError) {
      const mappedErrors = mutationError.errors.map((error) => ({
        property: String(
          error.property === "display_name"
            ? "displayName"
            : error.property === "avatar_file_id"
              ? "avatarFileId"
              : error.property === "role_ids"
                ? "roleIds"
                : error.property,
        ),
        messages: error.messages,
      }));

      applyValidationErrors(setError, mappedErrors);
    }
  }, [mutationError, setError]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (previewUrl) URL.revokeObjectURL(previewUrl);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onUploadAvatar(file);
    },
    [onUploadAvatar, previewUrl],
  );

  const handleResetAvatar = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setValue("avatarFileId", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [previewUrl, setValue]);

  const onSubmit: SubmitHandler<TUserEditFormSchema> = (data) => {
    onSubmitPayload({
      email: data.email,
      password: data.password || undefined,
      display_name: data.displayName,
      username: data.username || undefined,
      avatar_file_id: data.avatarFileId || undefined,
      bio: data.bio || undefined,
      role_ids: data.roleIds.length > 0 ? data.roleIds : undefined,
    });
  };

  const isFormDisabled = isPending || isPaused || isLoading || isRolesLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <FieldGroup>
            <Controller
              name="avatarFileId"
              control={control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Avatar</FieldLabel>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="size-24">
                      <AvatarImage src={previewUrl ?? avatarUrl ?? undefined} />
                      <AvatarFallback>
                        <Upload className="size-6 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col items-center gap-2">
                        {(previewUrl || avatarUrl) && (
                          <Button
                            type="button"
                            variant="default"
                            className="w-24"
                            disabled={isFormDisabled || isUploadingAvatar}
                            onClick={handleResetAvatar}
                          >
                            <RotateCcwClock data-icon="inline-start" />
                            Reset file
                          </Button>
                        )}

                        <Button
                          type="button"
                          variant="outline"
                          className="w-24"
                          disabled={isFormDisabled || isUploadingAvatar}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload data-icon="inline-start" />
                          Choose file
                          {isUploadingAvatar && (
                            <Spinner data-icon="inline-end" />
                          )}
                        </Button>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Input email"
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
              name="username"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    placeholder="Input username"
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
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="password"
                      type={isShowPassword ? "text" : "password"}
                      placeholder="Leave blank to keep current password"
                      disabled={isFormDisabled}
                      autoComplete="off"
                      {...field}
                    />
                    <InputGroupAddon align="inline-end">
                      <button
                        className="btn btn-ghost btn-square btn-sm"
                        type="button"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                      >
                        <If condition={isShowPassword}>
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="displayName"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="displayName">Display Name</FieldLabel>
                  <Input
                    id="displayName"
                    placeholder="Input display name"
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
              name="bio"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="bio">Bio</FieldLabel>
                  <Textarea
                    id="bio"
                    placeholder="Input bio"
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
              name="roleIds"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Roles</FieldLabel>
                  <Combobox
                    multiple
                    items={roles}
                    value={field.value.map(
                      (id) =>
                        roles.find((r) => r.value === id) ?? {
                          value: id,
                          label: id,
                        },
                    )}
                    onValueChange={(value) => {
                      field.onChange(value.map((v) => v.value));
                    }}
                    onInputValueChange={(inputValue) =>
                      onRoleSearchChange(inputValue)
                    }
                  >
                    <ComboboxChips>
                      {field.value.map((id) => {
                        const role = roles.find((r) => r.value === id);
                        return (
                          <ComboboxChip key={id}>
                            {role?.label ?? id}
                          </ComboboxChip>
                        );
                      })}
                      <ComboboxChipsInput placeholder="Select roles" />
                    </ComboboxChips>
                    <ComboboxContent>
                      <ComboboxEmpty>No roles found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item: { value: string; label: string }) => (
                          <ComboboxItem key={item.value} value={item}>
                            {item.label}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
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
                render={<Link href="/dashboard/master/iam/users" />}
                disabled={isFormDisabled || isUploadingAvatar}
                nativeButton={false}
              >
                Cancel
                {isFormDisabled && <Spinner />}
              </Button>

              <Button
                type="submit"
                disabled={isFormDisabled || isUploadingAvatar}
              >
                Save
                {(isFormDisabled || isUploadingAvatar) && <Spinner />}
              </Button>
            </Field>
          </FieldGroup>
        </CardFooter>
      </Card>
    </form>
  );
}
