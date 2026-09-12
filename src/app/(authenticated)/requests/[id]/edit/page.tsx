import type { Metadata } from "next";
import RequestEditPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Update request",
};

export default function RequestEditPage() {
  return <RequestEditPageClient />;
}
