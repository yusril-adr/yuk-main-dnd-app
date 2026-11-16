import { Suspense } from "react";
import type { Metadata } from "next";

import { makePageMetadata } from "@/utils/seo-helper";

import SchedulesPageClient from "./page-client";

export const metadata: Metadata = makePageMetadata({
  title: "Schedules",
  description:
    "See upcoming YukMainDnD stories and events on one calendar, then open a day and join the gathering.",
  path: "/schedules",
});

export default function SchedulesPage() {
  return (
    <Suspense>
      <SchedulesPageClient />
    </Suspense>
  );
}
