import type { Metadata } from "next";

import PublicStoryDetailPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Story detail",
};

export default function PublicStoryDetailPage() {
  return <PublicStoryDetailPageClient />;
}
