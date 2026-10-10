import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

// UI rule, not the API rule. Published only.
// Completed stays hidden even if cancel would succeed. Draft, archived, and cancelled stay hidden.
// Caller still applies stories:update or the creator.
export function canCancelStory(
  canUpdateStory: boolean,
  status: StoryStatusEnum | undefined,
): boolean {
  return canUpdateStory && status === StoryStatusEnum.PUBLISHED;
}
