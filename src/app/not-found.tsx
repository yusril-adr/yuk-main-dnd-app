"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

import { Button } from "@/app/_components/ui/button";
import { useT } from "@/app/_hooks/use-t";
import { NOT_FOUND_MESSAGES } from "@/app/_messages/not-found";

export default function NotFound() {
  const { t } = useT(NOT_FOUND_MESSAGES);

  return (
    <div className="w-full flex flex-col">
      <main className="w-full max-w-7xl h-full flex flex-col justify-center items-center px-10 pb-10 mx-auto gap-2">
        <DotLottieReact src={"/lotties/404-cat.json"} autoplay loop />
        <h1 className="font-heading text-2xl">{t("title")}</h1>
        <p>{t("description")}</p>
        <Button variant="default" render={<Link href="/" />}>
          {t("goHome")}
        </Button>
      </main>
    </div>
  );
}
