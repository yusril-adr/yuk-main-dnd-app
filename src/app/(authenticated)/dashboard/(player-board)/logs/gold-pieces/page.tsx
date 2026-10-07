import type { Metadata } from "next";

import GPLogsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Gold Pieces",
};

export default function GPLogsPage() {
  return <GPLogsPageClient />;
}
