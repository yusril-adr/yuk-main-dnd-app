import { useMemo, useSyncExternalStore } from "react";

import {
  getHomeMonthRange,
  getHomePreviousMonthKey,
} from "@/app/(public)/_utils/home-helper";

// The month never changes mid-visit in a way worth re-rendering for
const subscribe = () => () => {};

// Previous full UTC month for the home legends. "/" is prerendered at build
// time, so the server snapshot is null (no month baked into the HTML) and the
// real month is read on the client after hydration, avoiding a mismatch.
export function useHomePreviousMonthRange() {
  const monthKey = useSyncExternalStore(
    subscribe,
    getHomePreviousMonthKey,
    () => null,
  );

  return useMemo(
    () => (monthKey ? getHomeMonthRange(monthKey) : null),
    [monthKey],
  );
}
