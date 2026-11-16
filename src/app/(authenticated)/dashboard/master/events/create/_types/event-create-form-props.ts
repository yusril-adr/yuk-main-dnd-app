import type { TEventBannerUploadHandler } from "@/app/(authenticated)/dashboard/master/events/_types/event-banner-upload-handler";
import type { TEventCreatePayload } from "@/api/main/modules/master/events/types/event-create-payload";

export type TEventCreateFormProps = {
  onSubmitPayload: (payload: TEventCreatePayload) => void;
  mutationError: Error | null;
  isPending: boolean;
  isPaused: boolean;
  onUploadBanner: TEventBannerUploadHandler;
  isUploadingBanner: boolean;
};
