"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import GlobalLoader from "@/app/_components/global-loader";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { auth, authQuery } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!authQuery?.isLoading && !auth) {
      router.push("/login");
    }

    if (
      auth &&
      !authQuery?.isLoading &&
      !auth?.selected_role &&
      pathname !== "/switch-role" &&
      pathname !== "/settings"
    ) {
      const from = encodeURIComponent(pathname);
      router.push(`/switch-role?from=${from}`);
    }
  }, [authQuery?.isLoading, auth, router, pathname]);

  if (authQuery?.isLoading || !auth) return <GlobalLoader />;

  return children;
}
