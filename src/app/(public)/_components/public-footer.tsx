import { ExternalLink } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";

const CREDIT_URL = "https://yusril-adr.github.io";

// Server Component: the year is computed on the server, so no hydration mismatch
export default function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    // On the home page the footer turns red and drops its Separator so it blends into the final CTA band.
    // Pure CSS, no pathname: `group-has-[#final-cta]/public:*` compiles to `.group\/public:has(#final-cta) ...`,
    // matching only when the page inside the `group/public` wrapper (public layout) contains #final-cta.
    // That id lives in home-final-cta.tsx; renaming it silently brings back the parchment footer on home.
    <footer className="mt-auto w-full group-has-[#final-cta]/public:bg-primary group-has-[#final-cta]/public:text-primary-foreground">
      <Separator className="group-has-[#final-cta]/public:hidden" />
      <p className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-1 px-4 py-3 text-center text-[11px] leading-none text-muted-foreground group-has-[#final-cta]/public:text-primary-foreground/70 sm:px-10">
        <span>© {year} YukMainDnD</span>
        <span aria-hidden>·</span>
        <span>
          Crafted by{" "}
          <Button
            variant="link"
            nativeButton={false}
            className="h-auto gap-0.5 p-0 text-[11px] leading-none group-has-[#final-cta]/public:text-primary-foreground"
            render={
              <a href={CREDIT_URL} target="_blank" rel="noopener noreferrer" />
            }
          >
            Yonaka
            <ExternalLink aria-hidden className="size-2.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </Button>
        </span>
      </p>
    </footer>
  );
}
