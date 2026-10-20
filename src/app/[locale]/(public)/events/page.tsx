import type { Metadata } from "next";

import { makePageMetadata } from "@/utils/seo-helper";

import EventsPageClient from "./page-client";

export const metadata: Metadata = makePageMetadata({
  title: "Events",
  description:
    "Guild gatherings, one-shots and tabletop RPG events from YukMainDnD. Coming soon.",
  path: "/events",
});

export default function EventsPage() {
  return <EventsPageClient />;
}
