"use client";

import Link from "next/link";
import { CalendarDays, Crown, ScrollText, Users } from "lucide-react";

import { AspectRatio } from "@/app/_components/ui/aspect-ratio";
import { Badge } from "@/app/_components/ui/badge";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
} from "@/app/_components/ui/item";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Empty, EmptyMedia } from "@/app/_components/ui/empty";
import { STORY_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-type-label";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import { HOME_MESSAGES } from "@/app/(public)/_messages";
import dayjs from "@/libs/dayjs";

import { HOME_STORY_DATE_FORMAT } from "@/app/(public)/_constants/home";
import { getHomeStoryHref } from "@/app/(public)/_utils/home-helper";
import { getGuildmateHref } from "@/utils/user-helper";
import type { THomeStoryCardProps } from "@/app/(public)/_types/home-components-props";

// YouTube-style card: whole card hits story detail; only the DM row hits
// the guildmate (name underline/primary only when hovering that link).
export default function HomeStoryCard({ story }: THomeStoryCardProps) {
  const { t } = useT(HOME_MESSAGES);
  const { locale } = useLocale();
  const creator = story.created_by;

  return (
    <Card className="group relative h-full gap-3 pt-0 transition-[background-color,box-shadow] hover:bg-muted/40 hover:shadow-md has-focus-visible:ring-2 has-focus-visible:ring-ring">
      <Link
        href={getHomeStoryHref(story)}
        aria-label={story.title}
        className="absolute inset-0 z-0 rounded-[inherit] focus-visible:outline-none"
      />

      <AspectRatio
        ratio={16 / 10}
        className="pointer-events-none overflow-hidden border-b"
      >
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
      <CardHeader className="pointer-events-none">
        <CardTitle
          role="heading"
          aria-level={3}
          className="line-clamp-2 font-heading text-xl group-hover:text-primary"
        >
          {story.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-1.5">
          {creator ? (
            <Item
              size="xs"
              render={<Link href={getGuildmateHref(creator)} />}
              className="relative z-10 p-0 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ItemMedia className="text-primary">
                <Crown aria-hidden className="size-4" />
              </ItemMedia>
              <ItemContent className="min-w-0">
                <ItemDescription className="truncate underline-offset-4 group-hover/item:text-primary group-hover/item:underline">
                  {creator.display_name}
                </ItemDescription>
              </ItemContent>
            </Item>
          ) : (
            <Item size="xs" className="pointer-events-none p-0">
              <ItemMedia className="text-primary">
                <Crown aria-hidden className="size-4" />
              </ItemMedia>
              <ItemContent className="min-w-0">
                <ItemDescription className="truncate">
                  {t("stories.unknownDm")}
                </ItemDescription>
              </ItemContent>
            </Item>
          )}
          <Item size="xs" className="pointer-events-none p-0">
            <ItemMedia className="text-primary">
              <CalendarDays aria-hidden className="size-4" />
            </ItemMedia>
            <ItemContent>
              <ItemDescription>
                {story.start_at
                  ? dayjs(story.start_at)
                      .locale(locale)
                      .format(HOME_STORY_DATE_FORMAT)
                  : t("stories.dateTba")}
              </ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </CardContent>
      <CardFooter className="pointer-events-none mt-auto justify-between gap-2 border-t">
        <Badge variant="outline" className="max-w-[60%] truncate">
          {story.game_system || t("stories.anySystem")}
        </Badge>
        <Badge variant="secondary" className="shrink-0 gap-1.5">
          <Users aria-hidden className="size-3.5" />
          {t("stories.member", { count: story.joined_members })}
        </Badge>
      </CardFooter>
    </Card>
  );
}
