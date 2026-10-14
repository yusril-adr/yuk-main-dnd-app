import type { Metadata } from "next";
import PermissionsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Permissions",
};

export default function PermissionsPage() {
  return <PermissionsPageClient />;
}
