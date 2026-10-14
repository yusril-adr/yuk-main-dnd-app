import type { Metadata } from "next";

import ProfilePageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Profile",
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}
