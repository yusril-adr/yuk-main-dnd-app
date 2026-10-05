import { useCallback, useState } from "react";
import { EllipsisVertical, Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { Else, If, Then } from "react-if";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { PermissionEnum } from "@/common/enums/permission";
import { toTitleCase } from "@/utils/format-text";

import StoryCardBanner from "./story-card-banner";
import StoryStatusBadge from "./story-status-badge";
import type { TStoryCardProps } from "@/app/(authenticated)/dashboard/master/stories/_types/story-card-props";

export default function StoryCard({ story, onDelete }: TStoryCardProps) {
  const { auth } = useAuthContext();
  const canUpdateStories = auth?.permissions.includes(
    PermissionEnum.STORIES_UPDATE,
  );
  const canDeleteStories = auth?.permissions.includes(
    PermissionEnum.STORIES_DELETE,
  );
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const onDeleteConfirm = useCallback(() => {
    if (confirmDeleteId && onDelete) {
      onDelete(confirmDeleteId);
    }
    setConfirmDeleteId(null);
  }, [confirmDeleteId, onDelete]);

  return (
    <>
      {/* pt-0: the banner sits flush with the top edge of the card.
          gap-2 keeps the title close to the description. Cards in a grid row
          stretch to the tallest one, so the footer is pinned to the bottom with
          mt-auto; pb-2 on the content keeps a minimum gap above it. */}
      <Card className="gap-2 pt-0">
        <div className="relative">
          {/* Fixed 16:9 crop on list cards so every card is the same size
              (the form preview and detail page keep the natural ratio) */}
          <StoryCardBanner
            bannerUrl={story.banner_url}
            title={story.title}
            imageClassName="aspect-video max-h-none object-cover"
          />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Story actions"
                  // Plain ghost like the other ⋯ buttons; the drop shadow keeps the
                  // icon visible on light or busy banner images
                  className="absolute top-2 right-2 [&_svg]:drop-shadow-sm"
                >
                  <EllipsisVertical />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  render={
                    <Link href={`/dashboard/master/stories/${story.id}`} />
                  }
                >
                  <Eye />
                  View
                </DropdownMenuItem>
                {canUpdateStories && (
                  <DropdownMenuItem
                    render={
                      <Link
                        href={`/dashboard/master/stories/${story.id}/edit`}
                      />
                    }
                  >
                    <Pencil />
                    Edit
                  </DropdownMenuItem>
                )}
                {canDeleteStories && onDelete && (
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setConfirmDeleteId(story.id)}
                  >
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardHeader className="pt-2">
          <CardTitle className="min-w-0 truncate">
            <Button
              variant="link"
              className="p-0 h-auto text-base"
              render={<Link href={`/dashboard/master/stories/${story.id}`} />}
              nativeButton={false}
            >
              {story.title}
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-2">
          {/* min-h-15 = 3 lines of text-sm, keeps cards in the same row equal height */}
          <p className="line-clamp-3 min-h-15 text-muted-foreground">
            <If condition={!!story.description}>
              <Then>{story.description}</Then>
              <Else>No description.</Else>
            </If>
          </p>
        </CardContent>

        <CardFooter className="mt-auto border-t pt-3">
          <div className="flex flex-wrap gap-1.5">
            <StoryStatusBadge status={story.status} />
            <Badge variant="outline">{toTitleCase(story.type)}</Badge>
          </div>
        </CardFooter>
      </Card>

      <AlertDialog
        open={confirmDeleteId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmDeleteId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete story?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The story will be removed from the
              system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
