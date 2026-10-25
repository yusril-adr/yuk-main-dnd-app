export type TStoryRewardFieldConfig = {
  // false = the field is shown disabled with defaultValue
  isEditable: boolean;
  // Create form value, and the value shown while the field is disabled
  defaultValue: number;
  // Shown in the (?) popover while the field is disabled
  lockedNote: string;
};
