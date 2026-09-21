import type { Metadata } from "next";
import RequestDetailPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Request Detail",
};

export default function RequestDetailPage() {
  return <RequestDetailPageClient />;
}
