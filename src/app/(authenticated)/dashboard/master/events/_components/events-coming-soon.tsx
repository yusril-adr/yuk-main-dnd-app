import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/_components/ui/empty";

export default function EventsComingSoon() {
  return (
    <Empty className="rounded-xl border bg-card px-4 py-12 sm:py-20">
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="size-14 rounded-full bg-primary/10 text-primary [&_svg:not([class*='size-'])]:size-7"
        >
          <CalendarDays />
        </EmptyMedia>
        <Badge variant="outline" className="text-primary">
          Soon
        </Badge>
        <EmptyTitle className="font-heading text-2xl">Coming soon</EmptyTitle>
        <EmptyDescription>
          The heralds are still drafting the guild calendar. Feasts, tourneys
          and gatherings will be announced here soon.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant="outline"
          render={<Link href="/dashboard" />}
          nativeButton={false}
        >
          <ArrowLeft /> Back to dashboard
        </Button>
      </EmptyContent>
    </Empty>
  );
}
