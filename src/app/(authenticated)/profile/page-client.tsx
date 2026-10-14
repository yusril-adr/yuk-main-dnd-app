"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import GlobalLoader from "@/app/_components/global-loader";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { getGuildmateHref } from "@/utils/user-helper";

// Profile lives on the public guildmate page, so /profile only redirects there
export default function ProfilePageClient() {
  const { auth } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (auth) router.replace(getGuildmateHref(auth));
  }, [auth, router]);

  return <GlobalLoader />;
}
