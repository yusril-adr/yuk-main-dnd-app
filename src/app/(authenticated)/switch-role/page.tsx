import type { Metadata } from "next";
import { Suspense } from "react";
import SwitchRolePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Switch Role",
};

export default function SwitchRolePage() {
  return (
    <Suspense fallback={null}>
      <SwitchRolePageClient />
    </Suspense>
  );
}
