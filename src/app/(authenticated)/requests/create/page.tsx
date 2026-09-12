import type { Metadata } from "next";
import RequestCreatePageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Create Request",
};

export default function RequestCreatePage() {
  return <RequestCreatePageClient />;
}
