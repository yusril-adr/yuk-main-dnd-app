import { FilePurposesEnum } from "@/api/main/modules/files/enums/file-upload-purpose";

export type TFileUploadPayload = {
  file: File;
  purpose: FilePurposesEnum;
  metadata?: string;
};
