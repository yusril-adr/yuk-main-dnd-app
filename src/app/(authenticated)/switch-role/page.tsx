import type { Metadata } from "next";

import { NO_INDEX_METADATA } from "@/utils/seo-helper";
import { Suspense } from "react";
import SwitchRolePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Switch Role",
  ...NO_INDEX_METADATA,
};

export default function SwitchRolePage() {
  return (
    <Suspense fallback={null}>
      <SwitchRolePageClient />
    </Suspense>
  );
}
