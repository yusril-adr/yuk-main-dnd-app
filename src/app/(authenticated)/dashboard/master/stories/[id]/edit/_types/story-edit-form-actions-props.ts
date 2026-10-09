import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

export type TStoryEditFormActionsProps = {
  cancelHref: string;
  disabled: boolean;
  isPending: boolean;
  currentStatus?: StoryStatusEnum;
  onSave: () => void;
};
