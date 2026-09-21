"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import GlobalLoader from "@/app/_components/global-loader";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth, authQuery } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!authQuery?.isLoading && !auth) {
      router.push("/login");
    }
  }, [authQuery?.isLoading, auth, router]);

  if (authQuery?.isLoading) return <GlobalLoader />;

  if (!auth) return <GlobalLoader />;

  return children;
}
