import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

import "./globals.css";
import { cn } from "@/utils/cn";
import { FONT_VARIABLES } from "@/app/_constants/fonts";
import { Button } from "@/app/_components/ui/button";
import { routing } from "@/i18n/routing";
import { DEFAULT_MESSAGES } from "@/i18n/default-messages";

// Only for requests outside app/[locale] (the localized 404 is
// [locale]/not-found.tsx); the root layout is a pass-through, so this page
// renders its own <html> in the default locale
export default function RootNotFound() {
  const t = DEFAULT_MESSAGES.common.notFound;

  return (
    <html
      lang={routing.defaultLocale}
      className={cn("h-full", "antialiased", ...FONT_VARIABLES)}
    >
      <body className="min-h-full flex flex-col">
        <main className="w-full max-w-7xl h-full flex flex-col justify-center items-center px-10 pb-10 mx-auto gap-2">
          <DotLottieReact src={"/lotties/404-cat.json"} autoplay loop />
          <h1 className="font-heading text-2xl">{t.title}</h1>
          <p>{t.description}</p>
          <Button variant="default" render={<Link href="/" />}>
            {t.cta}
          </Button>
        </main>
      </body>
    </html>
  );
}
