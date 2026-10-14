import type { Metadata } from "next";

import RoleEditPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Edit role",
};

export default function RoleEditPage() {
  return <RoleEditPageClient />;
}
