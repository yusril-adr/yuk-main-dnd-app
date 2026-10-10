import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

// Matches StoryService.isCancelledStory. Update and member add/remove 400.
export function isCancelledStory(
  story:
    | {
        status: StoryStatusEnum;
        status_before?: StoryStatusEnum | null;
      }
    | null
    | undefined,
): boolean {
  if (!story) return false;
  return (
    story.status === StoryStatusEnum.CANCELLED ||
    (story.status === StoryStatusEnum.ARCHIVED &&
      story.status_before === StoryStatusEnum.CANCELLED)
  );
}
