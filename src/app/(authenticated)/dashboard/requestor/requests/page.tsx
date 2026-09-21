import type { Metadata } from "next";
import RequestsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Requests",
};

export default function RequestsPage() {
  return <RequestsPageClient />;
}
