import type { Metadata } from "next";

import StoryEditPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Edit story",
};

export default function StoryEditPage() {
  return <StoryEditPageClient />;
}
