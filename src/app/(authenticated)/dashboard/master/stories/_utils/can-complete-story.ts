import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

// UI rule, not the API rule. Published only.
// Caller still applies stories:update or the creator via canManageStory.
// Draft, archived, cancelled, and completed stay hidden. API 400s unless published.
export function canCompleteStory(
  canUpdateStory: boolean,
  status: StoryStatusEnum | undefined,
): boolean {
  return canUpdateStory && status === StoryStatusEnum.PUBLISHED;
}
