"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTranslations } from "next-intl";

import { Button } from "@/app/_components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("common.notFound");

  return (
    <div className="w-full flex flex-col">
      <main className="w-full max-w-7xl h-full flex flex-col justify-center items-center px-10 pb-10 mx-auto gap-2">
        <DotLottieReact src={"/lotties/404-cat.json"} autoplay loop />
        <h1 className="font-heading text-2xl">{t("title")}</h1>
        <p>{t("description")}</p>
        <Button variant="default" render={<Link href="/" />}>
          {t("cta")}
        </Button>
      </main>
    </div>
  );
}
