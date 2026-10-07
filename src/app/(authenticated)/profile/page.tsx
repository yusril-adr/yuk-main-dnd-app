import type { Metadata } from "next";

import ProfilePageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Gold Pieces",
};

export default function GPLogsPage() {
  return <ProfilePageClient />;
}
