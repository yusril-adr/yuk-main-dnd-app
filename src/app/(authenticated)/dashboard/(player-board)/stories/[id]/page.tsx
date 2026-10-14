import type { Metadata } from "next";

import BoardStoryDetailPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Story",
};

export default function BoardStoryDetailPage() {
  return <BoardStoryDetailPageClient />;
}
