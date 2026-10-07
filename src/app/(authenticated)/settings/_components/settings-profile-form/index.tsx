import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Link from "next/link";
import {
  KeyRound,
  RotateCcwClock,
  Upload,
  UserRound,
} from "lucide-react";
import { Else, If, Then } from "react-if";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
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
import { toCamelCase } from "@/utils/format-text";
import {
  SETTINGS_AVATAR_ACCEPTED_MIME_PREFIX,
  SETTINGS_AVATAR_MAX_FILE_SIZE_BYTES,
} from "@/app/(authenticated)/settings/_constants/settings-avatar";
import {
  SettingsProfileFormSchema,
  type TSettingsProfileFormSchema,
} from "./scheme";
import type { TSettingsProfileFormProps } from "../../_types/settings-profile-form-props";

export default function SettingsProfileForm({
  email,
  username,
  displayName,
  bio,
  avatarUrl,
  isLoading,
  onSubmitPayload,
  mutationError,
  isPending,
  isPaused,
  onUploadAvatar,
  isUploadingAvatar,
  avatarFileId,
  isAvatarRemoved,
  onAvatarRemovedChange,
  onChangePasswordClick,
}: TSettingsProfileFormProps) {
  const defaultValues = useMemo(
    () => ({
      email: email || "",
      username: username || "",
      displayName: displayName || "",
      bio: bio || "",
      avatarFileId: avatarFileId || "",
    }),
    [email, username, displayName, bio, avatarFileId],
  );

  const { control, handleSubmit, setError, setValue } =
    useForm<TSettingsProfileFormSchema>({
      resolver: zodResolver(SettingsProfileFormSchema),
      values: defaultValues,
    });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
        property: toCamelCase(String(error.property)),
        messages: error.messages,
      }));
      applyValidationErrors(setError, mappedErrors);
    }
  }, [mutationError, setError]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      if (!file.type.startsWith(SETTINGS_AVATAR_ACCEPTED_MIME_PREFIX)) {
        toast.error("Avatar must be an image file");
        event.target.value = "";
        return;
      }

      if (file.size > SETTINGS_AVATAR_MAX_FILE_SIZE_BYTES) {
        toast.error("Avatar must be 1 MB or smaller");
        event.target.value = "";
        return;
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onAvatarRemovedChange(false);
      onUploadAvatar(file);
    },
    [onUploadAvatar, onAvatarRemovedChange, previewUrl],
  );

  const handleRemoveAvatar = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setValue("avatarFileId", "");
    onAvatarRemovedChange(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [previewUrl, setValue, onAvatarRemovedChange]);

  const onSubmit: SubmitHandler<TSettingsProfileFormSchema> = (data) => {
    // Always send all fields so emptying username / bio clears them
    onSubmitPayload({
      email: data.email,
      username: data.username,
      display_name: data.displayName,
      bio: data.bio,
      avatar_file_id: data.avatarFileId
        ? data.avatarFileId
        : isAvatarRemoved
          ? null
          : undefined,
    });
  };

  const isFormDisabled = isPending || isPaused || isLoading;
  const shownAvatarUrl = isAvatarRemoved
    ? undefined
    : (previewUrl ?? avatarUrl ?? undefined);
  const canRemoveAvatar = !!previewUrl || (!!avatarUrl && !isAvatarRemoved);

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
                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <Avatar className="size-24">
                      <AvatarImage src={shownAvatarUrl} />
                      <AvatarFallback>
                        <UserRound className="size-6 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-28"
                            disabled={isFormDisabled || isUploadingAvatar}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <If condition={isUploadingAvatar}>
                              <Then>
                                <Spinner data-icon="inline-start" />
                              </Then>
                              <Else>
                                <Upload data-icon="inline-start" />
                              </Else>
                            </If>
                            Choose file
                          </Button>

                          <If condition={canRemoveAvatar}>
                            <Then>
                              <Button
                                type="button"
                                variant="default"
                                className="w-28"
                                disabled={isFormDisabled || isUploadingAvatar}
                                onClick={handleRemoveAvatar}
                              >
                                <RotateCcwClock data-icon="inline-start" />
                                Remove
                              </Button>
                            </Then>
                          </If>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                      <FieldDescription className="flex-1">
                        Your profile image should have a 1:1 ratio
                        <br />
                        and be no larger than 1MB.
                      </FieldDescription>
                    </div>
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
                  <If condition={fieldState.invalid}>
                    <Then>
                      <FieldError errors={[fieldState.error]} />
                    </Then>
                  </If>
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
                  <If condition={fieldState.invalid}>
                    <Then>
                      <FieldError errors={[fieldState.error]} />
                    </Then>
                  </If>
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
                  <If condition={fieldState.invalid}>
                    <Then>
                      <FieldError errors={[fieldState.error]} />
                    </Then>
                  </If>
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
                  <If condition={fieldState.invalid}>
                    <Then>
                      <FieldError errors={[fieldState.error]} />
                    </Then>
                  </If>
                </Field>
              )}
            />

          </FieldGroup>
        </CardContent>

        <CardFooter className="border-t-1 pt-4">
          {/* Phones: all three buttons full-width stacked.
              sm+: Change password left, Cancel / Save right */}
          <FieldGroup>
            <Field
              orientation="horizontal"
              className="w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              {/* Outline on phones; ghost from sm up (variant cannot be responsive) */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full sm:hidden"
                disabled={isFormDisabled || isUploadingAvatar}
                onClick={onChangePasswordClick}
              >
                <KeyRound data-icon="inline-start" />
                Change password
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="me-auto hidden sm:inline-flex"
                disabled={isFormDisabled || isUploadingAvatar}
                onClick={onChangePasswordClick}
              >
                <KeyRound data-icon="inline-start" />
                Change password
              </Button>

              <div className="flex w-full flex-col gap-3 sm:ms-auto sm:w-auto sm:flex-row">
                <Button
                  className="w-full sm:w-auto"
                  variant="outline"
                  type="button"
                  render={<Link href="/dashboard" />}
                  disabled={isFormDisabled || isUploadingAvatar}
                  nativeButton={false}
                >
                  Cancel
                </Button>

                <Button
                  className="w-full sm:w-auto"
                  type="submit"
                  disabled={isFormDisabled || isUploadingAvatar}
                >
                  <If condition={isPending || isPaused}>
                    <Then>
                      <Spinner data-icon="inline-start" />
                    </Then>
                  </If>
                  Save
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </CardFooter>
      </Card>
    </form>
  );
}
