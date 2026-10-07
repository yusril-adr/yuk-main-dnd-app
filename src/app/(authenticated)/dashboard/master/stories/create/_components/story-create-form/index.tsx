import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { STORY_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-type-label";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import { STORY_LOCATION_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-location-type-label";
import { applyValidationErrors } from "@/utils/validation-helper";
import { toCamelCase } from "@/utils/format-text";
import dayjs from "@/libs/dayjs";
import StoryBannerField from "@/app/(authenticated)/dashboard/master/stories/_components/story-banner-field";
import StoryFormActions from "@/app/(authenticated)/dashboard/master/stories/_components/story-form-actions";
import RichTextEditor from "@/app/_components/rich-text-editor";
import { STORY_DESCRIPTION_MAX_LENGTH } from "@/app/(authenticated)/dashboard/master/stories/_constants/story-description";
import { toStoryRewardPayload } from "@/app/(authenticated)/dashboard/master/stories/_utils/story-reward";
import { StoryCreateFormSchema, type TStoryCreateFormSchema } from "./scheme";
import type { TStoryCreateFormProps } from "../../_types/story-create-form-props";

export default function StoryCreateForm({
  onSubmitPayload,
  mutationError,
  isPending,
  isPaused,
  onUploadBanner,
  isUploadingBanner,
}: TStoryCreateFormProps) {
  const { control, handleSubmit, setError, setValue, clearErrors } =
    useForm<TStoryCreateFormSchema>({
      resolver: zodResolver(StoryCreateFormSchema),
      defaultValues: {
        bannerFileId: "",
        title: "",
        description: "",
        gameSystem: "",
        maxMembers: "",
        expAwarded: "0",
        pointAwarded: "0",
        startAt: "",
        locationDetail: "",
      },
    });

  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string | null>(null);

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
      setBannerPreviewUrl(URL.createObjectURL(file));
      onUploadBanner(file, {
        onSuccess: (fileId) => setValue("bannerFileId", fileId),
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
    data: TStoryCreateFormSchema,
    status: StoryStatusEnum,
  ) => {
    onSubmitPayload({
      title: data.title,
      description: data.description || undefined,
      status,
      type: data.type,
      game_system: data.gameSystem || undefined,
      max_members: data.maxMembers ? Number(data.maxMembers) : undefined,
      exp_awarded: toStoryRewardPayload(data.expAwarded),
      point_awarded: toStoryRewardPayload(data.pointAwarded),
      // datetime-local is the browser's local time; send it as ISO (UTC)
      start_at: data.startAt ? dayjs(data.startAt).toISOString() : undefined,
      location_type: data.locationType,
      location_detail: data.locationDetail,
      banner_file_id: data.bannerFileId || undefined,
    });
  };

  // Each footer button validates the form, then submits it with its own status
  const onSubmitWithStatus = (status: StoryStatusEnum) => {
    handleSubmit((data) => {
      setSubmittingStatus(status);
      submitPayload(data, status);
    })();
  };

  const isFormDisabled = isPending || isPaused;

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
                  previewUrl={bannerPreviewUrl}
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
                    items={Object.values(StoryTypeEnum).filter(
                      (v): v is StoryTypeEnum => typeof v === "number",
                    )}
                    onValueChange={field.onChange}
                    disabled={isFormDisabled}
                    {...field}
                    value={field.value ?? null}
                    itemToStringLabel={(item) => STORY_TYPE_LABEL[item]}
                  >
                    <ComboboxInput placeholder="Select type" />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {STORY_TYPE_LABEL[item as StoryTypeEnum]}
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

            {/* Rewards side by side from sm up */}
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-4">
              <Controller
                name="expAwarded"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="grid" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="expAwarded">XP Awarded</FieldLabel>
                    <Input
                      id="expAwarded"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={1}
                      placeholder="0"
                      disabled={isFormDisabled}
                      className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="pointAwarded"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="grid" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="pointAwarded">
                      Gold Awarded (GP)
                    </FieldLabel>
                    <Input
                      id="pointAwarded"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={1}
                      placeholder="0"
                      disabled={isFormDisabled}
                      className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

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
                    items={Object.values(StoryLocationTypeEnum).filter(
                      (v): v is StoryLocationTypeEnum => typeof v === "number",
                    )}
                    onValueChange={field.onChange}
                    disabled={isFormDisabled}
                    {...field}
                    value={field.value ?? null}
                    itemToStringLabel={(item) =>
                      STORY_LOCATION_TYPE_LABEL[item]
                    }
                  >
                    <ComboboxInput placeholder="Select location type" />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {STORY_LOCATION_TYPE_LABEL[item as StoryLocationTypeEnum]}
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
            onSubmitWithStatus={onSubmitWithStatus}
          />
        </CardFooter>
      </Card>
    </form>
  );
}
