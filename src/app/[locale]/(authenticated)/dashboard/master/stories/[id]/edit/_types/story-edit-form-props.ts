import type { TStoryBannerUploadHandler } from "@/app/[locale]/(authenticated)/dashboard/master/stories/_types/story-banner-upload-handler";
import type { TStoryPaginationResponse } from "@/api/main/modules/master/stories/types/story-pagination-response";
import type { TStoryUpdatePayload } from "@/api/main/modules/master/stories/[id]/types/story-update-payload";

export type TStoryEditFormProps = {
  story: TStoryPaginationResponse | undefined;
  isLoading: boolean;
  onSubmitPayload: (payload: TStoryUpdatePayload) => void;
  mutationError: Error | null;
  isPending: boolean;
  isPaused: boolean;
  onUploadBanner: TStoryBannerUploadHandler;
  isUploadingBanner: boolean;
};
