import type { Metadata } from "next";

import StoryDetailPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Story detail",
};

export default function StoryDetailPage() {
  return <StoryDetailPageClient />;
}
