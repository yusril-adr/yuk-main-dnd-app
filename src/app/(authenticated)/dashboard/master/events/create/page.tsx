import type { Metadata } from "next";

import EventCreatePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Create event",
};

export default function EventCreatePage() {
  return <EventCreatePageClient />;
}
