import type { Metadata } from "next";

import EventEditPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Edit event",
};

export default function EventEditPage() {
  return <EventEditPageClient />;
}
