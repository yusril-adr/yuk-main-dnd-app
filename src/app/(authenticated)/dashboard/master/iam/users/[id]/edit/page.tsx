import type { Metadata } from "next";

import UserEditPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Edit user",
};

export default function UserEditPage() {
  return <UserEditPageClient />;
}