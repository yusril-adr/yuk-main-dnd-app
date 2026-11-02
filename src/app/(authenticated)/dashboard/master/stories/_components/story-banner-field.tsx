import { useRef } from "react";
import { formatFileSize } from "@/utils/file-helper";
import { ImageIcon, Trash, Upload } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/app/_components/ui/field";
import { Spinner } from "@/app/_components/ui/spinner";
import {
  STORY_BANNER_ACCEPTED_TYPES,
  STORY_BANNER_MAX_FILE_SIZE_BYTES,
} from "@/app/(authenticated)/dashboard/master/stories/_constants/story-banner";
import type { TStoryBannerFieldProps } from "@/app/(authenticated)/dashboard/master/stories/_types/story-banner-field-props";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_STORIES_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/_messages/shared";

export default function StoryBannerField({
  previewUrl,
  isUploading,
  disabled,
  error,
  onFileSelect,
  onFileError,
  onRemove,
}: TStoryBannerFieldProps) {
  const { t } = useT(MASTER_STORIES_SHARED_MESSAGES);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxSizeLabel = formatFileSize(STORY_BANNER_MAX_FILE_SIZE_BYTES);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Clear the input so choosing the same file again still triggers onChange
    event.target.value = "";
    if (!file) return;

    if (!STORY_BANNER_ACCEPTED_TYPES.includes(file.type)) {
      onFileError(t("banner.errorType"));
      return;
    }
    if (file.size > STORY_BANNER_MAX_FILE_SIZE_BYTES) {
      onFileError(t("banner.errorSize", { maxSize: maxSizeLabel }));
      return;
    }

    onFileSelect(file);
  };

  return (
    <Field data-invalid={!!error}>
      <FieldLabel>{t("banner.label")}</FieldLabel>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="w-full sm:w-72 overflow-hidden rounded-lg border bg-muted">
          <If condition={!!previewUrl}>
            <Then>
              {/* Plain <img> like the story card banner (blob: or public storage URL).
                  Cropped to 16:10 like the story cards. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl ?? undefined}
                alt={t("banner.previewAlt")}
                className="block aspect-[16/10] w-full object-cover"
              />
            </Then>
            <Else>
              <div className="flex aspect-[16/10] w-full items-center justify-center">
                <ImageIcon className="size-8 text-muted-foreground" />
              </div>
            </Else>
          </If>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-48">
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={disabled || isUploading}
              onClick={() => fileInputRef.current?.click()}
            >
              <If condition={isUploading}>
                <Then>
                  <Spinner data-icon="inline-start" />
                </Then>
                <Else>
                  <Upload data-icon="inline-start" />
                </Else>
              </If>
              {t("banner.chooseFile")}
            </Button>

            <If condition={!!previewUrl}>
              <Then>
                <Button
                  type="button"
                  variant="outline"
                  disabled={disabled || isUploading}
                  onClick={onRemove}
                >
                  <Trash data-icon="inline-start" />
                  {t("banner.remove")}
                </Button>
              </Then>
            </If>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept={STORY_BANNER_ACCEPTED_TYPES.join(",")}
            className="hidden"
            onChange={handleFileChange}
          />
          <FieldDescription>
            {t("banner.description", { maxSize: maxSizeLabel })}
          </FieldDescription>
        </div>
      </div>

      <If condition={!!error}>
        <Then>
          <FieldError errors={[error]} />
        </Then>
      </If>
    </Field>
  );
}
