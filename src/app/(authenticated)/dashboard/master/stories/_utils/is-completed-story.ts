import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

// Update and member add/remove are blocked in the UI after complete, including
// an archived story whose previous status was completed.
export function isCompletedStory(
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
    story.status === StoryStatusEnum.COMPLETED ||
    (story.status === StoryStatusEnum.ARCHIVED &&
      story.status_before === StoryStatusEnum.COMPLETED)
  );
}
