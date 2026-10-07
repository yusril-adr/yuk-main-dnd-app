import type { Metadata } from "next";

import XPLogsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Experience Points",
};

export default function XPLogsPage() {
  return <XPLogsPageClient />;
}
