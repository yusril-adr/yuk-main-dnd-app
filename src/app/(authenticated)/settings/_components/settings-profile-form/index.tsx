import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { KeyRound, RotateCcwClock, Upload, UserRound } from "lucide-react";
import { Else, If, Then } from "react-if";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import RequiredFieldLabel from "@/app/_components/required-field-label";
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
import { emptyToNull } from "@/utils/form-helper";
import { applyValidationErrors } from "@/utils/validation-helper";
import { toCamelCase } from "@/utils/format-text";
import {
  USER_AVATAR_ACCEPTED_MIME_PREFIX,
  USER_AVATAR_MAX_FILE_SIZE_BYTES,
} from "@/common/constants/user-avatar";
import { formatFileSize } from "@/utils/file-helper";
import { useT } from "@/app/_hooks/use-t";

import { SETTINGS_MESSAGES } from "../../_messages";
import {
  createSettingsProfileFormSchema,
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
  const { t } = useT(SETTINGS_MESSAGES);
  const schema = useMemo(() => createSettingsProfileFormSchema(t), [t]);
  const avatarMaxSizeLabel = formatFileSize(USER_AVATAR_MAX_FILE_SIZE_BYTES);
  const avatarHintLines = t("profile.avatarHint", {
    size: avatarMaxSizeLabel,
  }).split("\n");

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
      resolver: zodResolver(schema),
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

      if (!file.type.startsWith(USER_AVATAR_ACCEPTED_MIME_PREFIX)) {
        toast.error(t("toast.avatarMustBeImage"));
        event.target.value = "";
        return;
      }

      if (file.size > USER_AVATAR_MAX_FILE_SIZE_BYTES) {
        toast.error(t("toast.avatarTooLarge", { size: avatarMaxSizeLabel }));
        event.target.value = "";
        return;
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onAvatarRemovedChange(false);
      onUploadAvatar(file);
    },
    [onUploadAvatar, onAvatarRemovedChange, previewUrl, t, avatarMaxSizeLabel],
  );

  const handleRemoveAvatar = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setValue("avatarFileId", "");
    onAvatarRemovedChange(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [previewUrl, setValue, onAvatarRemovedChange]);

  const onSubmit: SubmitHandler<TSettingsProfileFormSchema> = (data) => {
    // Always send all fields; cleared username / bio go as null to clear them
    onSubmitPayload({
      email: data.email,
      username: emptyToNull(data.username),
      display_name: data.displayName,
      bio: emptyToNull(data.bio),
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
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <FieldGroup>
            <Controller
              name="avatarFileId"
              control={control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{t("profile.avatar")}</FieldLabel>
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
                            {t("profile.chooseFile")}
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
                                {t("profile.remove")}
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
                        {avatarHintLines[0]}
                        <br />
                        {avatarHintLines[1]}
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
                  <RequiredFieldLabel required htmlFor="email">
                    {t("profile.email")}
                  </RequiredFieldLabel>
                  <Input
                    aria-required
                    id="email"
                    type="email"
                    placeholder={t("profile.emailPlaceholder")}
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
                  <FieldLabel htmlFor="username">
                    {t("profile.username")}
                  </FieldLabel>
                  <Input
                    id="username"
                    placeholder={t("profile.usernamePlaceholder")}
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
                  <RequiredFieldLabel required htmlFor="displayName">
                    {t("profile.displayName")}
                  </RequiredFieldLabel>
                  <Input
                    aria-required
                    id="displayName"
                    placeholder={t("profile.displayNamePlaceholder")}
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
                  <FieldLabel htmlFor="bio">{t("profile.bio")}</FieldLabel>
                  <Textarea
                    id="bio"
                    placeholder={t("profile.bioPlaceholder")}
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
                variant="ghost"
                size="sm"
                className="w-full sm:hidden"
                disabled={isFormDisabled || isUploadingAvatar}
                onClick={onChangePasswordClick}
              >
                <KeyRound data-icon="inline-start" />
                {t("profile.changePassword")}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="me-auto hidden sm:inline-flex"
                disabled={isFormDisabled || isUploadingAvatar}
                onClick={onChangePasswordClick}
              >
                <KeyRound data-icon="inline-start" />
                {t("profile.changePassword")}
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
                  {t("profile.cancel")}
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
                  {t("profile.save")}
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </CardFooter>
      </Card>
    </form>
  );
}
