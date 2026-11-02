"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { useT } from "@/app/_hooks/use-t";
import { COMING_SOON_MESSAGES } from "@/app/_messages/coming-soon";

export default function ComingSoonContent() {
  const { t } = useT(COMING_SOON_MESSAGES);

  return (
    <div className="w-full max-w-7xl h-full flex flex-col justify-center items-center text-center px-10 py-10 mx-auto gap-2">
      <div className="max-h-60">
        <DotLottieReact src={"/lotties/dragon-halo.json"} autoplay loop />
      </div>

      <h1 className="font-heading text-2xl">{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
