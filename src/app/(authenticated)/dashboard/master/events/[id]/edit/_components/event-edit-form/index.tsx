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
import EventEditFormActions from "./event-edit-form-actions";
import RichTextEditor from "@/app/_components/rich-text-editor";
import { EVENT_DESCRIPTION_MAX_LENGTH } from "@/app/(authenticated)/dashboard/master/events/_constants/event-description";
import { toEventRewardPayload } from "@/app/(authenticated)/dashboard/master/events/_utils/event-reward";
import { EVENT_REWARD_FIELD_CONFIG } from "@/app/(authenticated)/dashboard/master/events/_constants/event-reward-field";
import EventEditXpGuidePopover from "./event-edit-xp-guide-popover";
import EventRewardLockedPopover from "@/app/(authenticated)/dashboard/master/events/_components/event-reward-locked-popover";
import {
  createEventEditFormSchema,
  type TEventEditFormSchema,
} from "./scheme";
import type { TEventEditFormProps } from "../../_types/event-edit-form-props";
import { useT } from "@/app/_hooks/use-t";
import { useLocale } from "@/app/_hooks/use-locale";
import { localeToBcp47 } from "@/libs/i18n/locales";
import { MASTER_EVENTS_EDIT_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/[id]/edit/_messages";

const LOCATION_MESSAGE_KEY = {
  [EventLocationTypeEnum.ONLINE]: "enums.location.online",
  [EventLocationTypeEnum.OFFLINE]: "enums.location.offline",
} as const;

export default function EventEditForm({
  event,
  isLoading,
  onSubmitPayload,
  mutationError,
  isPending,
  isPaused,
  onUploadBanner,
  isUploadingBanner,
}: TEventEditFormProps) {
  const { t } = useT(MASTER_EVENTS_EDIT_MESSAGES);
  const { locale } = useLocale();
  const bcp47 = localeToBcp47(locale);
  const dateFnsLocale = locale === "id" ? idLocale : enUS;
  const schema = useMemo(
    () => createEventEditFormSchema(t, bcp47),
    [t, bcp47],
  );
  const locationLabel = useCallback(
    (location: EventLocationTypeEnum) => t(LOCATION_MESSAGE_KEY[location]),
    [t],
  );

  const values = useMemo(
    () => ({
      bannerFileId: "",
      isBannerRemoved: false,
      title: event?.title ?? "",
      // Stored as Markdown
      description: event?.description ?? "",
      maxMembers: event?.max_members ? String(event.max_members) : "",
      // A disabled reward field shows its config default, not the stored value
      expAwarded: String(
        EVENT_REWARD_FIELD_CONFIG.playerExp.isEditable
          ? (event?.exp_awarded ?? 0)
          : EVENT_REWARD_FIELD_CONFIG.playerExp.defaultValue,
      ),
      pointAwarded: String(
        EVENT_REWARD_FIELD_CONFIG.gold.isEditable
          ? (event?.point_awarded ?? 0)
          : EVENT_REWARD_FIELD_CONFIG.gold.defaultValue,
      ),
      // API returns ISO (UTC); datetime-local needs the browser's local time
      startAt: event?.start_at
        ? dayjs(event.start_at).format("YYYY-MM-DDTHH:mm")
        : "",
      locationType: event?.location_type as EventLocationTypeEnum,
      locationDetail: event?.location_detail ?? "",
      locationLink:
        event?.location_type === EventLocationTypeEnum.ONLINE
          ? ""
          : (event?.location_link ?? ""),
      feedbackFormLink: event?.feedback_form_link ?? "",
    }),
    [event],
  );

  const { control, handleSubmit, setError, setValue, clearErrors } =
    useForm<TEventEditFormSchema>({
      resolver: zodResolver(schema),
      values,
    });

  // Online events have no location link: the field is disabled and emptied
  const locationType = useWatch({ control, name: "locationType" });
  const isOnline = locationType === EventLocationTypeEnum.ONLINE;

  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string | null>(null);
  const isBannerRemoved = useWatch({ control, name: "isBannerRemoved" });
  // New local preview, else the existing banner unless it was removed
  const bannerSrc =
    bannerPreviewUrl ?? (isBannerRemoved ? null : (event?.banner_url ?? null));

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

  const submitPayload = (data: TEventEditFormSchema) => {
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
      max_members: data.maxMembers ? Number(data.maxMembers) : null,
      // NOT NULL columns: an emptied field is sent as 0, never null.
      // Disabled reward fields are left out so stored values are kept
      ...(EVENT_REWARD_FIELD_CONFIG.playerExp.isEditable && {
        exp_awarded: toEventRewardPayload(data.expAwarded),
      }),
      ...(EVENT_REWARD_FIELD_CONFIG.gold.isEditable && {
        point_awarded: toEventRewardPayload(data.pointAwarded),
      }),
      // datetime-local is the browser's local time; send it as ISO (UTC)
      start_at: data.startAt ? dayjs(data.startAt).toISOString() : null,
      location_type: data.locationType,
      location_detail: data.locationDetail,
      banner_file_id: bannerFileId,
      // Online events have no location link: clear any stored one
      location_link:
        data.locationType === EventLocationTypeEnum.ONLINE
          ? null
          : data.locationLink || null,
      feedback_form_link: data.feedbackFormLink || null,
    });
  };

  const onSave = handleSubmit((data) => submitPayload(data));

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
                <EventBannerField
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
                        <EventEditXpGuidePopover />
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
                    // Always controlled: field.value is undefined until the event loads
                    // (and on create until picked); null = no selection for Base UI
                    value={field.value ?? null}
                    // Same labels as the detail page (e.g. "oneshot" -> "Oneshot")
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
          <EventEditFormActions
            cancelHref="/dashboard/master/events"
            disabled={isFormDisabled || isUploadingBanner}
            isPending={isPending}
            currentStatus={event?.status}
            onSave={onSave}
          />
        </CardFooter>
      </Card>
    </form>
  );
}
