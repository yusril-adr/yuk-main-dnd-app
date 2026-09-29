"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";

import CONFIG from "@/common/constants/config";
import { ThemeToggler } from "@/app/_components/theme-toggler";
import GlobalLoader from "@/app/_components/global-loader";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { SwitchRoleForm } from "@/app/(authenticated)/switch-role/_components/form";
import { useSwitchRole } from "@/app/(authenticated)/switch-role/_hooks/use-switch-role";

export default function SwitchRolePageClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [fromQuery] = useQueryState(
    "from",
    parseAsString.withDefault("/dashboard"),
  );
  const fromQueryRef = useRef(fromQuery);
  const { auth, authQuery } = useAuthContext();

  useEffect(() => {
    fromQueryRef.current = fromQuery;
  }, [fromQuery]);

  const {
    mutate: switchRoleMutate,
    error: switchRoleError,
    isPending: switchRoleIsPending,
    isPaused: switchRoleIsPaused,
  } = useSwitchRole({
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: CONFIG.QUERY_KEY.MAIN_API.AUTH.ME(),
      });
      router.replace(fromQueryRef.current);
    },
  });

  if (authQuery?.isLoading || !auth) {
    return <GlobalLoader />;
  }

  return (
    <div className="w-full flex justify-center items-center">
      <main className="flex w-full h-[calc(100vh-32px)] max-w-7xl px-10 relative">
        <div className="absolute right-0 top-0 pt-4">
          {CONFIG.IS_USING_THEME_TOGGLER && <ThemeToggler />}
        </div>

        <div className="flex w-full h-full justify-center items-center">
          <SwitchRoleForm
            user={auth}
            onSubmitPayload={switchRoleMutate}
            mutationError={switchRoleError}
            isPending={switchRoleIsPending}
            isPaused={switchRoleIsPaused}
          />
        </div>
      </main>
    </div>
  );
}
