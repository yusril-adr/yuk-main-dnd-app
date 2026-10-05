import type { TStoryBannerUploadHandler } from "@/app/(authenticated)/dashboard/master/stories/_types/story-banner-upload-handler";
import type { TStoryResponse } from "@/api/main/modules/master/stories/types/story-response";
import type { TStoryUpdatePayload } from "@/api/main/modules/master/stories/[id]/types/story-update-payload";

export type TStoryEditFormProps = {
  story: TStoryResponse | undefined;
  isLoading: boolean;
  onSubmitPayload: (payload: TStoryUpdatePayload) => void;
  mutationError: Error | null;
  isPending: boolean;
  isPaused: boolean;
  onUploadBanner: TStoryBannerUploadHandler;
  isUploadingBanner: boolean;
};
