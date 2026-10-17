"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";

import CONFIG from "@/common/constants/config";
import YmdndLogo from "@/assets/YMDND1.svg";
import { authMe } from "@/api/main/modules/auth/me";
import { ThemeToggler } from "@/app/_components/theme-toggler";
import { LoginForm } from "@/app/login/_components/form";
import { useLogin } from "@/app/login/_hooks/use-login";

export default function LoginPageClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [fromQuery] = useQueryState("from", parseAsString.withDefault("/"));

  // useRef avoids a stale closure: useQueryState defaults to "/"
  // during SSR and updates asynchronously on the client. The mutation's
  // onSuccess callback captures the initial value at render time, so we
  // sync the latest query into a ref and read it at redirect time instead.
  const fromQueryRef = useRef(fromQuery);

  useEffect(() => {
    fromQueryRef.current = fromQuery;
  }, [fromQuery]);

  const {
    mutate: loginMutate,
    error: loginError,
    isPending: loginIsPending,
    isPaused: loginIsPaused,
  } = useLogin({
    onSuccess: async () => {
      await queryClient.fetchQuery({
        queryKey: CONFIG.QUERY_KEY.MAIN_API.AUTH.ME(),
        queryFn: authMe,
      });
      router.replace(fromQueryRef.current);
    },
  });

  return (
    <div className="w-full flex justify-center items-center">
      <main className="flex w-full h-full min-h-[calc(100vh-32px)] px-10 lg:px-0 relative">
        <div className="absolute right-0 top-0 pt-4">
          {CONFIG.IS_USING_THEME_TOGGLER && <ThemeToggler />}
        </div>

        <LoginForm
          onSubmitPayload={loginMutate}
          mutationError={loginError}
          isPending={loginIsPending}
          isPaused={loginIsPaused}
        />

        <div className="hidden lg:flex lg:w-1/2 h-full min-h-screen justify-center items-center bg-primary">
          <YmdndLogo
            className="w-[405px] max-w-[80%] h-auto text-primary-foreground"
            role="img"
            aria-label="Yuk Main DnD logo"
            alt="Yuk Main DnD logo"
          />
        </div>
      </main>
    </div>
  );
}
