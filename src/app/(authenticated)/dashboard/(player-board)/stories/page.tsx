import { Suspense } from "react";
import type { Metadata } from "next";

import StoriesPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - My Stories",
};

export default function StoriesPage() {
  // nuqs reads search params, so the client page needs a Suspense boundary
  return (
    <Suspense>
      <StoriesPageClient />
    </Suspense>
  );
}
