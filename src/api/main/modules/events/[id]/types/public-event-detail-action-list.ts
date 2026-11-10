export type TPublicEventDetailActionList = {
  // Only true for a logged-in non-member on a published event
  is_can_join: boolean;
  is_can_cancel_join: boolean;
};
