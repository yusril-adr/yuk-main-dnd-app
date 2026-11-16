import type { TEventRewardFieldConfig } from "@/app/(authenticated)/dashboard/master/events/_types/event-reward-field-config";

// Reward fields on the event create/edit forms. Flip isEditable to true to let
// DMs set the value. While disabled, create sends defaultValue and edit leaves
// the field out so stored values are kept
export const EVENT_REWARD_FIELD_CONFIG: Record<
  "playerExp" | "gold",
  TEventRewardFieldConfig
> = {
  // The API accepts 0 or more (exp_awarded), defaulting to 1
  playerExp: {
    isEditable: false,
    defaultValue: 1,
    lockedNote:
      "EXP rewards are standardized: every attending player gets 1 EXP per event, so it can't be filled in here. The DM gets 1 DM EXP automatically, unless they also played.",
  },
  gold: {
    isEditable: false,
    defaultValue: 0,
    lockedNote:
      "Gold rewards are standardized for now, so they can't be filled in here.",
  },
};
