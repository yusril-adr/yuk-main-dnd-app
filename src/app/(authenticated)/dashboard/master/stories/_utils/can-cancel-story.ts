import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

// Draft, published, and completed only. Archived and cancelled 400.
// Caller still applies stories:update or the creator.
export function canCancelStory(
  canUpdateStory: boolean,
  status: StoryStatusEnum | undefined,
): boolean {
  return (
    canUpdateStory &&
    (status === StoryStatusEnum.DRAFT ||
      status === StoryStatusEnum.PUBLISHED ||
      status === StoryStatusEnum.COMPLETED)
  );
}
