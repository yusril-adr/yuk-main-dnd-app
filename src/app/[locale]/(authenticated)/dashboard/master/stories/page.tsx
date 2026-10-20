import type { Metadata } from "next";

import StoriesPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Stories",
};

export default function StoriesPage() {
  return <StoriesPageClient />;
}
