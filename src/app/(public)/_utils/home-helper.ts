// Home legends always use the previous full UTC month. The shared helper
// lives here so guildmates can reuse the same range and label logic.
export {
  getPreviousUtcMonthKey as getHomePreviousMonthKey,
  getUtcMonthRange as getHomeMonthRange,
} from "./month-range-helper";
