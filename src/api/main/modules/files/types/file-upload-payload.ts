import { FilePurposesEnum } from "@/api/main/modules/files/enums/file-upload-purpose";

export type TFileUploadPayload = {
  purpose: FilePurposesEnum;
  metadata?: string;
};
