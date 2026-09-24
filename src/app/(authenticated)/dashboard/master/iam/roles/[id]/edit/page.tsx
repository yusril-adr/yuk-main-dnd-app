import type { Metadata } from "next";

import RoleEditPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Edit role",
};

export default function RoleEditPage() {
  return <RoleEditPageClient />;
}
