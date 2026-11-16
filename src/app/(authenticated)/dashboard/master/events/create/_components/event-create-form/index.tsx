import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enUS, id as idLocale } from "date-fns/locale";
import { CalendarDays as CalendarIcon, XIcon } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import RequiredFieldLabel from "@/app/_components/required-field-label";
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
import { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";
import { applyValidationErrors } from "@/utils/validation-helper";
import { toCamelCase } from "@/utils/format-text";
import dayjs from "@/libs/dayjs";
import { cn } from "cn";
import EventBannerField from "@/app/(authenticated)/dashboard/master/events/_components/event-banner-field";
import EventCreateFormActions from "./event-create-form-actions";
import RichTextEditor from "@/app/_components/rich-text-editor";
import { EVENT_DESCRIPTION_MAX_LENGTH } from "@/app/(authenticated)/dashboard/master/events/_constants/event-description";
import { toEventRewardPayload } from "@/app/(authenticated)/dashboard/master/events/_utils/event-reward";
import { EVENT_REWARD_FIELD_CONFIG } from "@/app/(authenticated)/dashboard/master/events/_constants/event-reward-field";
import EventCreateXpGuidePopover from "./event-create-xp-guide-popover";
import EventRewardLockedPopover from "@/app/(authenticated)/dashboard/master/events/_components/event-reward-locked-popover";
import {
  createEventCreateFormSchema,
  type TEventCreateFormSchema,
} from "./scheme";
import type { TEventCreateStatus } from "@/app/(authenticated)/dashboard/master/events/create/_types/event-create-status";
import type { TEventCreateFormProps } from "../../_types/event-create-form-props";
import { useT } from "@/app/_hooks/use-t";
import { useLocale } from "@/app/_hooks/use-locale";
import { localeToBcp47 } from "@/libs/i18n/locales";
import { MASTER_EVENTS_CREATE_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/create/_messages";

const LOCATION_MESSAGE_KEY = {
  [EventLocationTypeEnum.ONLINE]: "enums.location.online",
  [EventLocationTypeEnum.OFFLINE]: "enums.location.offline",
} as const;

export default function EventCreateForm({
  onSubmitPayload,
  mutationError,
  isPending,
  isPaused,
  onUploadBanner,
  isUploadingBanner,
}: TEventCreateFormProps) {
  const { t } = useT(MASTER_EVENTS_CREATE_MESSAGES);
  const { locale } = useLocale();
  const bcp47 = localeToBcp47(locale);
  const dateFnsLocale = locale === "id" ? idLocale : enUS;
  const schema = useMemo(
    () => createEventCreateFormSchema(t, bcp47),
    [t, bcp47],
  );
  const locationLabel = useCallback(
    (location: EventLocationTypeEnum) => t(LOCATION_MESSAGE_KEY[location]),
    [t],
  );

  const { control, handleSubmit, setError, setValue, clearErrors } =
    useForm<TEventCreateFormSchema>({
      resolver: zodResolver(schema),
      defaultValues: {
        bannerFileId: "",
        title: "",
        description: "",
        maxMembers: "",
        expAwarded: String(EVENT_REWARD_FIELD_CONFIG.playerExp.defaultValue),
        pointAwarded: String(EVENT_REWARD_FIELD_CONFIG.gold.defaultValue),
        startAt: "",
        locationDetail: "",
        locationLink: "",
        feedbackFormLink: "",
      },
    });

  // Online events have no location link: the field is disabled and emptied
  const locationType = useWatch({ control, name: "locationType" });
  const isOnline = locationType === EventLocationTypeEnum.ONLINE;

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
    useState<TEventCreateStatus | null>(null);

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
    data: TEventCreateFormSchema,
    status: TEventCreateStatus,
  ) => {
    onSubmitPayload({
      title: data.title,
      description: data.description || undefined,
      status,
      max_members: data.maxMembers ? Number(data.maxMembers) : undefined,
      // Always sent: a disabled field holds its config default
      exp_awarded: toEventRewardPayload(data.expAwarded),
      point_awarded: toEventRewardPayload(data.pointAwarded),
      // datetime-local is the browser's local time; send it as ISO (UTC)
      start_at: data.startAt ? dayjs(data.startAt).toISOString() : undefined,
      location_type: data.locationType,
      location_detail: data.locationDetail,
      banner_file_id: data.bannerFileId || undefined,
      location_link:
        data.locationType === EventLocationTypeEnum.ONLINE
          ? undefined
          : data.locationLink || undefined,
      feedback_form_link: data.feedbackFormLink || undefined,
    });
  };

  // Each footer button validates the form, then submits it with its own status
  const onSubmitWithStatus = (status: TEventCreateStatus) => {
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
                <EventBannerField
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
                  <RequiredFieldLabel required htmlFor="title">{t("fields.title")}</RequiredFieldLabel>
                  <Input
                    aria-required
                    id="title"
                    placeholder={t("fields.titlePlaceholder")}
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
                  <FieldLabel id="description-label">{t("fields.description")}</FieldLabel>
                  <RichTextEditor
                    id="description"
                    ariaLabelledBy="description-label"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t("fields.descriptionPlaceholder")}
                    maxLength={EVENT_DESCRIPTION_MAX_LENGTH}
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
              name="maxMembers"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="maxMembers">{t("fields.maxMembers")}</FieldLabel>
                  <Input
                    id="maxMembers"
                    type="number"
                    min={1}
                    placeholder={t("fields.maxMembersPlaceholder")}
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
                    <div className="flex items-center gap-1">
                      <FieldLabel htmlFor="expAwarded">{t("fields.expAwarded")}</FieldLabel>
                      {EVENT_REWARD_FIELD_CONFIG.playerExp.isEditable ? (
                        <EventCreateXpGuidePopover />
                      ) : (
                        <EventRewardLockedPopover
                          label={t("fields.expAwarded")}
                          description={t("rewards.expLockedNote")}
                        />
                      )}
                    </div>
                    <Input
                      id="expAwarded"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={1}
                      placeholder="0"
                      disabled={
                        isFormDisabled ||
                        !EVENT_REWARD_FIELD_CONFIG.playerExp.isEditable
                      }
                      className={cn(
                        "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                        // Fixed values stay readable while disabled
                        !EVENT_REWARD_FIELD_CONFIG.playerExp.isEditable &&
                          "disabled:bg-muted/30 disabled:opacity-100",
                      )}
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
                    <div className="flex items-center gap-1">
                      <FieldLabel htmlFor="pointAwarded">
                        {t("fields.goldAwarded")}
                      </FieldLabel>
                      {!EVENT_REWARD_FIELD_CONFIG.gold.isEditable && (
                        <EventRewardLockedPopover
                          label={t("fields.goldAwardedShort")}
                          description={t("rewards.goldLockedNote")}
                        />
                      )}
                    </div>
                    <Input
                      id="pointAwarded"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={1}
                      placeholder="0"
                      disabled={
                        isFormDisabled ||
                        !EVENT_REWARD_FIELD_CONFIG.gold.isEditable
                      }
                      className={cn(
                        "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                        // Fixed values stay readable while disabled
                        !EVENT_REWARD_FIELD_CONFIG.gold.isEditable &&
                          "disabled:bg-muted/30 disabled:opacity-100",
                      )}
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
                  <FieldLabel>{t("fields.startAt")}</FieldLabel>
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
                              ? dayjs(field.value).locale(locale).format("D MMMM YYYY")
                              : null}
                          </Then>
                          <Else>
                            <span>{t("fields.pickDate")}</span>
                          </Else>
                        </If>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          locale={dateFnsLocale}
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
                            ? dayjs(field.value).format("HH:mm")
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
                  <RequiredFieldLabel required htmlFor="locationType">{t("fields.locationType")}</RequiredFieldLabel>
                  <Combobox
                    id="locationType"
                    items={Object.values(EventLocationTypeEnum).filter(
                      (v): v is EventLocationTypeEnum => typeof v === "number",
                    )}
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (value === EventLocationTypeEnum.ONLINE) {
                        setValue("locationLink", "");
                        clearErrors("locationLink");
                      }
                    }}
                    disabled={isFormDisabled}
                    {...field}
                    value={field.value ?? null}
                    itemToStringLabel={(item) => locationLabel(item)}
                  >
                    <ComboboxInput aria-required placeholder={t("fields.selectLocationType")} />
                    <ComboboxContent>
                      <ComboboxEmpty>{t("fields.noItemsFound")}</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {locationLabel(item as EventLocationTypeEnum)}
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
                  <RequiredFieldLabel required htmlFor="locationDetail">
                    {t("fields.locationDetail")}
                  </RequiredFieldLabel>
                  <Textarea
                    aria-required
                    id="locationDetail"
                    placeholder={
                      isOnline
                        ? t("fields.locationDetailOnlinePlaceholder")
                        : t("fields.locationDetailPlaceholder")
                    }
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
              name="locationLink"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="locationLink">{t("fields.locationLink")}</FieldLabel>
                  <Input
                    id="locationLink"
                    type="url"
                    inputMode="url"
                    placeholder="https://maps.app.goo.gl/..."
                    {...field}
                    // Online events have no location link
                    disabled={isFormDisabled || isOnline}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="feedbackFormLink"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="feedbackFormLink">
                    {t("fields.feedbackFormLink")}
                  </FieldLabel>
                  <Input
                    id="feedbackFormLink"
                    type="url"
                    inputMode="url"
                    placeholder="https://forms.gle/..."
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
          <EventCreateFormActions
            cancelHref="/dashboard/master/events"
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
