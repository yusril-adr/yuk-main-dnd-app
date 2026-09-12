import type { Metadata } from "next";
import UsersPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Users",
};

export default function UsersPage() {
  return <UsersPageClient />;
}
