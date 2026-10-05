import type { FieldError } from "react-hook-form";

export type TStoryBannerFieldProps = {
  previewUrl: string | null;
  isUploading: boolean;
  disabled: boolean;
  error?: FieldError;
  onFileSelect: (file: File) => void;
  onFileError: (message: string) => void;
  onRemove: () => void;
};
