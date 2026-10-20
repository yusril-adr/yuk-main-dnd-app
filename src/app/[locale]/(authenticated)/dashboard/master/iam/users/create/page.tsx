import type { Metadata } from "next";

import UserCreatePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Create user",
};

export default function UserCreatePage() {
  return <UserCreatePageClient />;
}
