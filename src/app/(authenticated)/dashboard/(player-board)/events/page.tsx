import { Suspense } from "react";
import type { Metadata } from "next";

import EventsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "My Events",
};

export default function EventsPage() {
  // nuqs reads search params, so the client page needs a Suspense boundary
  return (
    <Suspense>
      <EventsPageClient />
    </Suspense>
  );
}
