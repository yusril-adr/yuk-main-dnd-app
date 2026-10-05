import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

export type TStoryFormActionsProps = {
  cancelHref: string;
  disabled: boolean;
  isPending: boolean;
  // Status of the button that started the current submit (spinner target)
  submittingStatus: StoryStatusEnum | null;
  // Edit only: shown as a badge so users know what the story is now
  currentStatus?: StoryStatusEnum;
  onSubmitWithStatus: (status: StoryStatusEnum) => void;
};
