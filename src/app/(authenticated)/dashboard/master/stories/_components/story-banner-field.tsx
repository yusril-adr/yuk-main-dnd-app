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

export default function StoryBannerField({
  previewUrl,
  isUploading,
  disabled,
  error,
  onFileSelect,
  onFileError,
  onRemove,
}: TStoryBannerFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Clear the input so choosing the same file again still triggers onChange
    event.target.value = "";
    if (!file) return;

    if (!STORY_BANNER_ACCEPTED_TYPES.includes(file.type)) {
      onFileError("Banner must be a JPG, PNG, or WebP image");
      return;
    }
    if (file.size > STORY_BANNER_MAX_FILE_SIZE_BYTES) {
      onFileError(
        `Banner must be ${formatFileSize(STORY_BANNER_MAX_FILE_SIZE_BYTES)} or smaller`,
      );
      return;
    }

    onFileSelect(file);
  };

  return (
    <Field data-invalid={!!error}>
      <FieldLabel>Banner</FieldLabel>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="w-full sm:w-72 overflow-hidden rounded-lg border bg-muted">
          <If condition={!!previewUrl}>
            <Then>
              {/* Plain <img> like the story card banner (blob: or public storage URL).
                  Cropped to 16:10 like the story cards. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl ?? undefined}
                alt="Story banner preview"
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

        <div className="flex w-full flex-col gap-2 sm:w-72">
          <div className="grid auto-cols-fr grid-flow-col gap-2">
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
              Choose file
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
                  Remove
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
            JPG, PNG, or WebP image, max{" "}
            {formatFileSize(STORY_BANNER_MAX_FILE_SIZE_BYTES)}. Recommended
            16:10 (e.g. 1600 &times; 1000 px) with the main subject centered,
            since the public pages crop the edges.
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
