import type { Metadata } from "next";
import RequestCreatePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Create Request",
};

export default function RequestCreatePage() {
  return <RequestCreatePageClient />;
}
