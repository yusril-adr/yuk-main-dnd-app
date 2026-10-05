import { useRef } from "react";
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
      onFileError("Banner must be 2 MB or smaller");
      return;
    }

    onFileSelect(file);
  };

  return (
    <Field data-invalid={!!error}>
      <FieldLabel>Banner</FieldLabel>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="aspect-video w-full sm:w-72 overflow-hidden rounded-lg border bg-muted">
          <If condition={!!previewUrl}>
            <Then>
              {/* Plain <img> like the story card banner (blob: or public storage URL) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl ?? undefined}
                alt="Story banner preview"
                className="size-full object-cover"
              />
            </Then>
            <Else>
              <div className="flex size-full items-center justify-center">
                <ImageIcon className="size-8 text-muted-foreground" />
              </div>
            </Else>
          </If>
        </div>

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

          <input
            ref={fileInputRef}
            type="file"
            accept={STORY_BANNER_ACCEPTED_TYPES.join(",")}
            className="hidden"
            onChange={handleFileChange}
          />
          <FieldDescription>
            16:9 image (JPG, PNG, or WebP), max 2 MB.
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
