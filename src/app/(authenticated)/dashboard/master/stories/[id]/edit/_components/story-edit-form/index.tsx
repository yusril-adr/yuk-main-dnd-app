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
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/app/_components/ui/combobox";
import { Button } from "@/app/_components/ui/button";
import { Spinner } from "@/app/_components/ui/spinner";

import MainAPIValidationError from "@/api/main/errors/validation-error";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import { applyValidationErrors } from "@/utils/validation-helper";
import { toCamelCase } from "@/utils/format-text";
import dayjs from "@/libs/dayjs";
import { StoryEditFormSchema, type TStoryEditFormSchema } from "./scheme";
import type { TStoryEditFormProps } from "../../_types/story-edit-form-props";

export default function StoryEditForm({
  story,
  isLoading,
  onSubmitPayload,
  mutationError,
  isPending,
  isPaused,
}: TStoryEditFormProps) {
  const values = useMemo(
    () => ({
      title: story?.title ?? "",
      description: story?.description ?? "",
      status: story?.status ?? StoryStatusEnum.DRAFT,
      type: story?.type as StoryTypeEnum,
      gameSystem: story?.game_system ?? "",
      maxMembers: story?.max_members ? String(story.max_members) : "",
      // API returns ISO (UTC); datetime-local needs the browser's local time
      startAt: story?.start_at
        ? dayjs(story.start_at).format("YYYY-MM-DDTHH:mm")
        : "",
      locationType: story?.location_type as StoryLocationTypeEnum,
      locationDetail: story?.location_detail ?? "",
    }),
    [story],
  );

  const { control, handleSubmit, setError } = useForm<TStoryEditFormSchema>({
    resolver: zodResolver(StoryEditFormSchema),
    values,
  });

  useEffect(() => {
    if (mutationError instanceof MainAPIValidationError) {
      const mappedErrors = mutationError.errors.map((error) => ({
        property: toCamelCase(String(error.property)),
        messages: error.messages,
      }));

      applyValidationErrors(setError, mappedErrors);
    }
  }, [mutationError, setError]);

  const onSubmit: SubmitHandler<TStoryEditFormSchema> = (data) => {
    onSubmitPayload({
      title: data.title,
      // Emptied optional fields are sent as null so the API clears them
      description: data.description || null,
      status: data.status,
      type: data.type,
      game_system: data.gameSystem || null,
      max_members: data.maxMembers ? Number(data.maxMembers) : null,
      // datetime-local is the browser's local time; send it as ISO (UTC)
      start_at: data.startAt ? dayjs(data.startAt).toISOString() : null,
      location_type: data.locationType,
      location_detail: data.locationDetail,
    });
  };

  const isFormDisabled = isPending || isPaused || isLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <FieldGroup>
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
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    id="description"
                    placeholder="Input story description"
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
              name="status"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="status">Status</FieldLabel>
                  <Combobox
                    id="status"
                    items={Object.values(StoryStatusEnum)}
                    onValueChange={field.onChange}
                    disabled={isFormDisabled}
                    {...field}
                  >
                    <ComboboxInput placeholder="Select status" />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
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
                  >
                    <ComboboxInput placeholder="Select type" />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
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
                  <FieldLabel htmlFor="startAt">Start At</FieldLabel>
                  <Input
                    id="startAt"
                    type="datetime-local"
                    placeholder="Select start date and time"
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
                  >
                    <ComboboxInput placeholder="Select location type" />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
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
                  <FieldLabel htmlFor="locationDetail">Location Detail</FieldLabel>
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
          <FieldGroup>
            <Field orientation="horizontal">
              <Button
                className="ms-auto"
                variant="outline"
                type="reset"
                render={<Link href="/dashboard/master/stories" />}
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
