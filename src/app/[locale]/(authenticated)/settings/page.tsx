import type { Metadata } from "next";

import SettingsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return <SettingsPageClient />;
}
