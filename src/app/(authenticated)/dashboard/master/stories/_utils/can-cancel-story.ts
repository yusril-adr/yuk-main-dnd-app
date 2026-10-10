import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

// UI rule, not the API rule. Published and completed only.
// Draft is not offered even if cancel would succeed. Archived and cancelled stay hidden.
// Caller still applies stories:update or the creator.
export function canCancelStory(
  canUpdateStory: boolean,
  status: StoryStatusEnum | undefined,
): boolean {
  return (
    canUpdateStory &&
    (status === StoryStatusEnum.PUBLISHED ||
      status === StoryStatusEnum.COMPLETED)
  );
}
