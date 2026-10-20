import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

import "./globals.css";
import { cn } from "@/utils/cn";
import { FONT_VARIABLES } from "@/app/_constants/fonts";
import { Button } from "@/app/_components/ui/button";

// Only for requests outside app/[locale] (the localized 404 is
// [locale]/not-found.tsx); the root layout is a pass-through, so this page
// renders its own <html>
export default function RootNotFound() {
  return (
    <html lang="en" className={cn("h-full", "antialiased", ...FONT_VARIABLES)}>
      <body className="min-h-full flex flex-col">
        <main className="w-full max-w-7xl h-full flex flex-col justify-center items-center px-10 pb-10 mx-auto gap-2">
          <DotLottieReact src={"/lotties/404-cat.json"} autoplay loop />
          <h1 className="font-heading text-2xl">Page not found</h1>
          <p>The page you are looking for does not exist.</p>
          <Button variant="default" render={<Link href="/" />}>
            Go to Home
          </Button>
        </main>
      </body>
    </html>
  );
}
