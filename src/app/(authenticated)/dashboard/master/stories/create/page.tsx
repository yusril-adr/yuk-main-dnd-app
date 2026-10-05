import type { Metadata } from "next";

import StoryCreatePageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Create story",
};

export default function StoryCreatePage() {
  return <StoryCreatePageClient />;
}
