import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

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

export default function GoodsComingSoon() {
  return (
    <Empty className="rounded-xl border bg-card px-4 py-12 sm:py-20">
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="size-14 rounded-full bg-primary/10 text-primary [&_svg:not([class*='size-'])]:size-7"
        >
          <Scale />
        </EmptyMedia>
        <Badge variant="outline" className="text-primary">
          Soon
        </Badge>
        <EmptyTitle className="font-heading text-2xl">Coming soon</EmptyTitle>
        <EmptyDescription>
          The quartermaster is still stocking the shelves. Wares, relics and
          trinkets will be ledgered here soon.
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
