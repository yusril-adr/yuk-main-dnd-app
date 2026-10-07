import type { Metadata } from "next";

import StoriesPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Stories",
};

export default function StoriesPage() {
  return <StoriesPageClient />;
}
