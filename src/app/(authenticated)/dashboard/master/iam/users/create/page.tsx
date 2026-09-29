import type { Metadata } from "next";

import UserCreatePageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Create user",
};

export default function UserCreatePage() {
  return <UserCreatePageClient />;
}