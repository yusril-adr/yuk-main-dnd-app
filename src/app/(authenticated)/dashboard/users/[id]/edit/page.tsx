import type { Metadata } from "next";
import UserEditPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Update User",
};

export default function UserEditPage() {
  return <UserEditPageClient />;
}
