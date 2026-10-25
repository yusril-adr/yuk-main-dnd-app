import type { TStoryRewardFieldConfig } from "@/app/(authenticated)/dashboard/master/stories/_types/story-reward-field-config";

// Reward fields on the story create/edit forms. Flip isEditable to true to let
// DMs set the value. While disabled, create sends defaultValue and edit leaves
// the field out so stored values are kept
export const STORY_REWARD_FIELD_CONFIG: Record<
  "playerExp" | "gold",
  TStoryRewardFieldConfig
> = {
  // The API only accepts 1 for now (exp_awarded)
  playerExp: { isEditable: false, defaultValue: 1 },
  gold: { isEditable: false, defaultValue: 0 },
};
