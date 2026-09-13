"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Image from "next/image";

import CONFIG from "@/common/constants/config";
import { ThemeToggler } from "@/app/_components/theme-toggler";
import { LoginForm } from "@/app/login/_components/form";
import { useLogin } from "@/app/login/_hooks/use-login";
import { parseAsString, useQueryState } from "nuqs";

export default function LoginPageClient() {
  const router = useRouter();
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
    onSuccess: () => {
      router.replace(fromQueryRef.current);
    },
  });

  return (
    <div className="w-full flex justify-center items-center">
      <main className="flex w-full h-[calc(100vh-32px)] max-w-7xl px-10 relative">
        <div className="absolute right-0 top-0 pt-4">
          {CONFIG.IS_USING_THEME_TOGGLER && <ThemeToggler />}
        </div>

        <div className="hidden lg:flex lg:w-1/2 h-screen justify-center items-center">
          <Image
            width={1270}
            height={841}
            src="https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/main/Next.js/png/Next.js.png"
            alt="Next logo"
          />
        </div>

        <LoginForm
          onSubmitPayload={loginMutate}
          mutationError={loginError}
          isPending={loginIsPending}
          isPaused={loginIsPaused}
        />
      </main>
    </div>
  );
}
