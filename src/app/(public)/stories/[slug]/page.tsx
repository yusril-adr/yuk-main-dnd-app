import type { Metadata } from "next";

import PublicStoryDetailPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Quest",
  description: "Quest details, party and Dungeon Master on YukMainDnD.",
};

export default function PublicStoryDetailPage() {
  return <PublicStoryDetailPageClient />;
}
