import type { Metadata } from "next";
import AuditLogsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Audit Logs",
};

export default function AuditLogsPage() {
  return <AuditLogsPageClient />;
}
