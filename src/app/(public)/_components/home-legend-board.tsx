import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/app/_components/ui/item";
import { Skeleton } from "@/app/_components/ui/skeleton";
import {
  getGuildmateHref,
  getInitials,
  makeDefaultAvatarUrl,
} from "@/utils/user-helper";

import HomeEmptyState from "@/app/(public)/_components/home-empty-state";
import HomeErrorState from "@/app/(public)/_components/home-error-state";
import type { THomeLegendBoardProps } from "@/app/(public)/_types/home-components-props";

export default function HomeLegendBoard({
  title,
  icon: Icon,
  entries,
  isLoading,
  isError,
  onRetry,
}: THomeLegendBoardProps) {
  let content: React.ReactNode;
  if (isLoading) {
    content = (
      <ItemGroup className="gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <Item key={i} variant="outline" size="sm">
            <Skeleton className="size-10 rounded-full" />
            <ItemContent>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-16" />
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    );
  } else if (isError) {
    content = (
      <HomeErrorState
        text="The legends are lost to the mist."
        onRetry={onRetry}
      />
    );
  } else if (entries.length === 0) {
    content = (
      <HomeEmptyState text="No legends yet this month. The tavern awaits." />
    );
  } else {
    content = (
      <ItemGroup className="gap-2">
        {entries.map(({ user, gainedExp }, index) => (
          <Item key={user.id} variant="outline" size="sm" role="listitem">
            <ItemMedia className="relative">
              <Avatar className="size-10">
                <AvatarImage
                  src={
                    user.avatar_url || makeDefaultAvatarUrl(user.display_name)
                  }
                  alt={user.display_name}
                  loading="lazy"
                />
                <AvatarFallback>
                  {getInitials(user.display_name)}
                </AvatarFallback>
              </Avatar>
              <Badge className="absolute -right-1.5 -bottom-1 size-5 justify-center rounded-full p-0 text-[10px] leading-none tabular-nums">
                {index + 1}
              </Badge>
            </ItemMedia>
            <ItemContent className="min-w-0">
              <ItemTitle className="w-full">
                <Link
                  href={getGuildmateHref(user)}
                  className="truncate font-heading underline-offset-4 hover:text-primary hover:underline"
                >
                  {user.display_name}
                </Link>
              </ItemTitle>
              {user.username ? (
                <ItemDescription className="truncate">
                  @{user.username}
                </ItemDescription>
              ) : null}
            </ItemContent>
            <ItemActions className="font-heading text-primary tabular-nums">
              +{gainedExp.toLocaleString("en-US")} XP
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle
          role="heading"
          aria-level={3}
          className="flex items-center gap-2 font-heading text-lg"
        >
          <Icon aria-hidden className="size-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
