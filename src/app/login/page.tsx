import type { Metadata } from "next";
import { Suspense } from "react";
import LoginPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Login",
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageClient />
    </Suspense>
  );
}
