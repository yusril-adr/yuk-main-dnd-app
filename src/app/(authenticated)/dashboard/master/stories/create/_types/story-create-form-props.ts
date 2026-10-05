import type { TStoryCreatePayload } from "@/api/main/modules/master/stories/types/story-create-payload";

export type TStoryCreateFormProps = {
  onSubmitPayload: (payload: TStoryCreatePayload) => void;
  mutationError: Error | null;
  isPending: boolean;
  isPaused: boolean;
};
