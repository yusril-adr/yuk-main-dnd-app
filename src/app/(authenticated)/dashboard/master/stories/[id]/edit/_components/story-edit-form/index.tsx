import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarDays as CalendarIcon, XIcon } from "lucide-react";
import { Else, If, Then } from "react-if";

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
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/app/_components/ui/combobox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Calendar } from "@/app/_components/ui/calendar";
import { Button } from "@/app/_components/ui/button";

import MainAPIValidationError from "@/api/main/errors/validation-error";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import { applyValidationErrors } from "@/utils/validation-helper";
import { toCamelCase, toTitleCase } from "@/utils/format-text";
import { toRichTextHtml } from "@/utils/rich-text";
import dayjs from "@/libs/dayjs";
import StoryBannerField from "@/app/(authenticated)/dashboard/master/stories/_components/story-banner-field";
import StoryFormActions from "@/app/(authenticated)/dashboard/master/stories/_components/story-form-actions";
import RichTextEditor from "@/app/_components/rich-text-editor";
import { STORY_DESCRIPTION_MAX_LENGTH } from "@/app/(authenticated)/dashboard/master/stories/_constants/story-description";
import { toStoryRewardPayload } from "@/app/(authenticated)/dashboard/master/stories/_utils/story-reward";
import { StoryEditFormSchema, type TStoryEditFormSchema } from "./scheme";
import type { TStoryEditFormProps } from "../../_types/story-edit-form-props";

export default function StoryEditForm({
  story,
  isLoading,
  onSubmitPayload,
  mutationError,
  isPending,
  isPaused,
  onUploadBanner,
  isUploadingBanner,
}: TStoryEditFormProps) {
  const values = useMemo(
    () => ({
      bannerFileId: "",
      isBannerRemoved: false,
      title: story?.title ?? "",
      // Old plain-text descriptions become paragraphs / line breaks for the editor
      description: toRichTextHtml(story?.description),
      type: story?.type as StoryTypeEnum,
      gameSystem: story?.game_system ?? "",
      maxMembers: story?.max_members ? String(story.max_members) : "",
      expAwarded: String(story?.exp_awarded ?? 0),
      pointAwarded: String(story?.point_awarded ?? 0),
      // API returns ISO (UTC); datetime-local needs the browser's local time
      startAt: story?.start_at
        ? dayjs(story.start_at).format("YYYY-MM-DDTHH:mm")
        : "",
      locationType: story?.location_type as StoryLocationTypeEnum,
      locationDetail: story?.location_detail ?? "",
    }),
    [story],
  );

  const { control, handleSubmit, setError, setValue, clearErrors } =
    useForm<TStoryEditFormSchema>({
      resolver: zodResolver(StoryEditFormSchema),
      values,
    });

  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string | null>(null);
  const isBannerRemoved = useWatch({ control, name: "isBannerRemoved" });
  // New local preview, else the existing banner unless it was removed
  const bannerSrc =
    bannerPreviewUrl ?? (isBannerRemoved ? null : (story?.banner_url ?? null));

  // Revoke the previous local preview when it changes, and on unmount
  useEffect(() => {
    return () => {
      if (bannerPreviewUrl) URL.revokeObjectURL(bannerPreviewUrl);
    };
  }, [bannerPreviewUrl]);

  const onBannerSelect = useCallback(
    (file: File) => {
      clearErrors("bannerFileId");
      setValue("bannerFileId", "");
      setValue("isBannerRemoved", false);
      setBannerPreviewUrl(URL.createObjectURL(file));
      onUploadBanner(file, {
        onSuccess: (fileId) => setValue("bannerFileId", fileId),
        // A failed upload falls back to the existing banner
        onError: () => setBannerPreviewUrl(null),
      });
    },
    [clearErrors, setValue, onUploadBanner],
  );

  const onBannerFileError = useCallback(
    (message: string) => setError("bannerFileId", { message }),
    [setError],
  );

  const onBannerRemove = useCallback(() => {
    clearErrors("bannerFileId");
    setValue("bannerFileId", "");
    setValue("isBannerRemoved", true);
    setBannerPreviewUrl(null);
  }, [clearErrors, setValue]);

  useEffect(() => {
    if (mutationError instanceof MainAPIValidationError) {
      const mappedErrors = mutationError.errors.map((error) => ({
        property: toCamelCase(String(error.property)),
        messages: error.messages,
      }));

      applyValidationErrors(setError, mappedErrors);
    }
  }, [mutationError, setError]);

  const [submittingStatus, setSubmittingStatus] =
    useState<StoryStatusEnum | null>(null);

  const [dateOpen, setDateOpen] = useState(false);

  const onDateSelect = useCallback(
    (
      date: Date | undefined,
      onChange: (value: string) => void,
      currentValue: string,
    ) => {
      if (date) {
        const current = currentValue ? new Date(currentValue) : new Date();
        date.setHours(current.getHours(), current.getMinutes());
        onChange(date.toISOString());
      }
      setDateOpen(false);
    },
    [],
  );

  const onTimeChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      onChange: (value: string) => void,
      currentValue: string,
    ) => {
      const [hours, minutes] = e.target.value.split(":").map(Number);
      const date = currentValue ? new Date(currentValue) : new Date();
      date.setHours(hours, minutes);
      onChange(date.toISOString());
    },
    [],
  );

  const onClearStartAt = useCallback((onChange: (value: string) => void) => {
    onChange("");
  }, []);

  const submitPayload = (
    data: TStoryEditFormSchema,
    status: StoryStatusEnum,
  ) => {
    // undefined = untouched (left out of the JSON), null = remove, string = new banner
    let bannerFileId: string | null | undefined;
    if (data.bannerFileId) {
      bannerFileId = data.bannerFileId;
    } else if (data.isBannerRemoved) {
      bannerFileId = null;
    }

    onSubmitPayload({
      title: data.title,
      // Emptied optional fields are sent as null so the API clears them
      description: data.description || null,
      status,
      type: data.type,
      game_system: data.gameSystem || null,
      max_members: data.maxMembers ? Number(data.maxMembers) : null,
      // NOT NULL columns: an emptied field is sent as 0, never null
      exp_awarded: toStoryRewardPayload(data.expAwarded),
      point_awarded: toStoryRewardPayload(data.pointAwarded),
      // datetime-local is the browser's local time; send it as ISO (UTC)
      start_at: data.startAt ? dayjs(data.startAt).toISOString() : null,
      location_type: data.locationType,
      location_detail: data.locationDetail,
      banner_file_id: bannerFileId,
    });
  };

  // Each footer button validates the form, then submits it with its own status
  const onSubmitWithStatus = (status: StoryStatusEnum) => {
    handleSubmit((data) => {
      setSubmittingStatus(status);
      submitPayload(data, status);
    })();
  };

  const isFormDisabled = isPending || isPaused || isLoading;

  return (
    // No submit-type button any more; Enter must not submit
    <form onSubmit={(event) => event.preventDefault()}>
      <Card>
        <CardContent>
          <FieldGroup>
            <Controller
              name="bannerFileId"
              control={control}
              render={({ fieldState }) => (
                <StoryBannerField
                  previewUrl={bannerSrc}
                  isUploading={isUploadingBanner}
                  disabled={isFormDisabled}
                  error={fieldState.error}
                  onFileSelect={onBannerSelect}
                  onFileError={onBannerFileError}
                  onRemove={onBannerRemove}
                />
              )}
            />

            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    id="title"
                    placeholder="Input story title"
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
                  <FieldLabel id="description-label">Description</FieldLabel>
                  <RichTextEditor
                    id="description"
                    ariaLabelledBy="description-label"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Describe the quest: the hook, the setting, what players should expect..."
                    maxLength={STORY_DESCRIPTION_MAX_LENGTH}
                    disabled={isFormDisabled}
                    isInvalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="type"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="type">Type</FieldLabel>
                  <Combobox
                    id="type"
                    items={Object.values(StoryTypeEnum)}
                    onValueChange={field.onChange}
                    disabled={isFormDisabled}
                    {...field}
                    // Always controlled: field.value is undefined until the story loads
                    // (and on create until picked); null = no selection for Base UI
                    value={field.value ?? null}
                    // Same labels as the detail page (e.g. "oneshot" -> "Oneshot")
                    itemToStringLabel={(item) => toTitleCase(item)}
                  >
                    <ComboboxInput placeholder="Select type" />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {toTitleCase(item)}
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

            <Controller
              name="gameSystem"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="gameSystem">Game System</FieldLabel>
                  <Input
                    id="gameSystem"
                    placeholder="e.g. DnD 5e 2014"
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
              name="maxMembers"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="maxMembers">Max Members</FieldLabel>
                  <Input
                    id="maxMembers"
                    type="number"
                    min={1}
                    placeholder="Input max members"
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
              name="startAt"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel>Start At</FieldLabel>
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-4">
                    <Popover open={dateOpen} onOpenChange={setDateOpen}>
                      <PopoverTrigger
                        render={
                          <Button
                            variant="outline"
                            data-empty={!field.value}
                            className="justify-start bg-inherit text-left font-normal data-[empty=true]:text-muted-foreground"
                            disabled={isFormDisabled}
                          />
                        }
                      >
                        <CalendarIcon />
                        <If condition={!!field.value}>
                          <Then>
                            {field.value
                              ? format(new Date(field.value), "PPP")
                              : null}
                          </Then>
                          <Else>
                            <span>Pick a date</span>
                          </Else>
                        </If>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            onDateSelect(date, field.onChange, field.value)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <div className="flex gap-2">
                      <Input
                        type="time"
                        disabled={isFormDisabled}
                        value={
                          field.value
                            ? format(new Date(field.value), "HH:mm")
                            : ""
                        }
                        onChange={(e) =>
                          onTimeChange(e, field.onChange, field.value)
                        }
                        className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                      <If condition={!!field.value}>
                        <Then>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isFormDisabled}
                            onClick={() => onClearStartAt(field.onChange)}
                            type="button"
                          >
                            <XIcon />
                          </Button>
                        </Then>
                      </If>
                    </div>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="locationType"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="locationType">Location Type</FieldLabel>
                  <Combobox
                    id="locationType"
                    items={Object.values(StoryLocationTypeEnum)}
                    onValueChange={field.onChange}
                    disabled={isFormDisabled}
                    {...field}
                    // Always controlled: field.value is undefined until the story loads
                    // (and on create until picked); null = no selection for Base UI
                    value={field.value ?? null}
                    // Same labels as the detail page (e.g. "oneshot" -> "Oneshot")
                    itemToStringLabel={(item) => toTitleCase(item)}
                  >
                    <ComboboxInput placeholder="Select location type" />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {toTitleCase(item)}
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

            <Controller
              name="locationDetail"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="locationDetail">
                    Location Detail
                  </FieldLabel>
                  <Textarea
                    id="locationDetail"
                    placeholder="e.g. Discord link or venue address"
                    disabled={isFormDisabled}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter className="border-t-1 pt-4">
          <StoryFormActions
            cancelHref="/dashboard/master/stories"
            disabled={isFormDisabled || isUploadingBanner}
            isPending={isPending}
            submittingStatus={submittingStatus}
            currentStatus={story?.status}
            onSubmitWithStatus={onSubmitWithStatus}
          />
        </CardFooter>
      </Card>
    </form>
  );
}
