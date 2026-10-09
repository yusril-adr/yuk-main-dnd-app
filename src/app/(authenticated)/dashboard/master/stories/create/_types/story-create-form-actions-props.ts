import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

export type TStoryCreateFormActionsProps = {
  cancelHref: string;
  disabled: boolean;
  isPending: boolean;
  submittingStatus: StoryStatusEnum | null;
  onSubmitWithStatus: (status: StoryStatusEnum) => void;
};
