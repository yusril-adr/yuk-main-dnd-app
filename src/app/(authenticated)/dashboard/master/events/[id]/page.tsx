import type { Metadata } from "next";

import EventDetailPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Event detail",
};

export default function EventDetailPage() {
  return <EventDetailPageClient />;
}
