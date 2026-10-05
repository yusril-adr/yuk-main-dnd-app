import type { Metadata } from "next";

import StoryDetailPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Story detail",
};

export default function StoryDetailPage() {
  return <StoryDetailPageClient />;
}
