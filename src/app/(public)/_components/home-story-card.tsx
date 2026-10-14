import Link from "next/link";
import { CalendarDays, Crown, ScrollText, Users } from "lucide-react";

import { AspectRatio } from "@/app/_components/ui/aspect-ratio";
import { Badge } from "@/app/_components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Empty, EmptyMedia } from "@/app/_components/ui/empty";
import { STORY_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-type-label";
import dayjs from "@/libs/dayjs";

import { HOME_STORY_DATE_FORMAT } from "@/app/(public)/_constants/home";
import { getHomeStoryHref } from "@/app/(public)/_utils/home-helper";
import type { THomeStoryCardProps } from "@/app/(public)/_types/home-components-props";

// The title link is stretched over the card so the whole card is clickable
export default function HomeStoryCard({ story }: THomeStoryCardProps) {
  return (
    <Card className="group relative h-full gap-3 pt-0 transition-colors hover:ring-primary/50 has-focus-visible:ring-2 has-focus-visible:ring-ring">
      <AspectRatio ratio={16 / 10} className="overflow-hidden border-b">
        {story.banner_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={story.banner_url}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <Empty className="absolute inset-0 rounded-none bg-secondary p-0">
            <EmptyMedia className="mb-0 text-primary/50">
              <ScrollText className="size-8" />
            </EmptyMedia>
          </Empty>
        )}
        <Badge variant="outline" className="absolute top-2 left-2 bg-card">
          {STORY_TYPE_LABEL[story.type]}
        </Badge>
      </AspectRatio>
      <CardHeader>
        <CardTitle
          role="heading"
          aria-level={3}
          className="line-clamp-2 font-heading text-xl group-hover:text-primary"
        >
          <Link
            href={getHomeStoryHref(story)}
            className="outline-none after:absolute after:inset-0"
          >
            {story.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5 text-sm text-muted-foreground">
        <span className="flex items-center gap-2 truncate">
          <Crown aria-hidden className="size-4 shrink-0 text-primary" />
          {story.created_by?.display_name ?? "Unknown DM"}
        </span>
        <span className="flex items-center gap-2">
          <CalendarDays aria-hidden className="size-4 shrink-0 text-primary" />
          {story.start_at
            ? dayjs(story.start_at).format(HOME_STORY_DATE_FORMAT)
            : "Date to be announced"}
        </span>
      </CardContent>
      <CardFooter className="mt-auto justify-between gap-2 border-t text-sm text-muted-foreground">
        <span className="truncate">{story.game_system || "Any system"}</span>
        <span className="flex shrink-0 items-center gap-1.5">
          <Users aria-hidden className="size-4 text-primary" />
          {story.joined_members}{" "}
          {story.joined_members === 1 ? "member" : "members"}
        </span>
      </CardFooter>
    </Card>
  );
}
