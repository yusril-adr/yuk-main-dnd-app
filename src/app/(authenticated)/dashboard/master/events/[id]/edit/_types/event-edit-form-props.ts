import type { TEventBannerUploadHandler } from "@/app/(authenticated)/dashboard/master/events/_types/event-banner-upload-handler";
import type { TEventPaginationResponse } from "@/api/main/modules/master/events/types/event-pagination-response";
import type { TEventUpdatePayload } from "@/api/main/modules/master/events/[id]/types/event-update-payload";

export type TEventEditFormProps = {
  event: TEventPaginationResponse | undefined;
  isLoading: boolean;
  onSubmitPayload: (payload: TEventUpdatePayload) => void;
  mutationError: Error | null;
  isPending: boolean;
  isPaused: boolean;
  onUploadBanner: TEventBannerUploadHandler;
  isUploadingBanner: boolean;
};
