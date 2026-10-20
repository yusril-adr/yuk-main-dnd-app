import type { Metadata } from "next";

import { NO_INDEX_METADATA } from "@/utils/seo-helper";
import { Suspense } from "react";
import LoginPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Login",
  ...NO_INDEX_METADATA,
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageClient />
    </Suspense>
  );
}
