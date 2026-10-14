import type { Metadata } from "next";
import UserEditPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Update User",
};

export default function UserEditPage() {
  return <UserEditPageClient />;
}
