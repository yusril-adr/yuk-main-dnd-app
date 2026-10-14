import type { Metadata } from "next";

import RolesPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Roles",
};

export default function RolesPage() {
  return <RolesPageClient />;
}
