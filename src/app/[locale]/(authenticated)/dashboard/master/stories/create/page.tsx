import type { Metadata } from "next";

import StoryCreatePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Create story",
};

export default function StoryCreatePage() {
  return <StoryCreatePageClient />;
}
