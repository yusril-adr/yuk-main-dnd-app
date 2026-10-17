import { ExternalLink } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";

const CREDIT_URL = "https://yusril-adr.github.io";

// Server Component: the year is computed on the server, so no hydration mismatch
export default function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full">
      <Separator />
      <p className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-1 px-4 py-3 text-center text-[11px] leading-none text-muted-foreground sm:px-10">
        <span>© {year} YukMainDnD</span>
        <span aria-hidden>·</span>
        <span>
          Crafted by{" "}
          <Button
            variant="link"
            nativeButton={false}
            className="h-auto gap-0.5 p-0 text-[11px] leading-none"
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
