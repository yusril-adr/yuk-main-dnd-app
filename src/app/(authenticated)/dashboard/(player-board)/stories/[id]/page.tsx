import type { Metadata } from "next";

import BoardStoryDetailPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Story",
};

export default function BoardStoryDetailPage() {
  return <BoardStoryDetailPageClient />;
}
