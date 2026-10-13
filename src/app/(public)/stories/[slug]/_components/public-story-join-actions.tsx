"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { DoorOpen, LogIn, Swords } from "lucide-react";
import { toast } from "sonner";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { Spinner } from "@/app/_components/ui/spinner";
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
import CONFIG from "@/common/constants/config";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

import { useJoinPublicStory } from "@/app/(public)/stories/[slug]/_hooks/use-join-public-story";
import { useCancelJoinPublicStory } from "@/app/(public)/stories/[slug]/_hooks/use-cancel-join-public-story";
import type { TPublicStoryDetailProps } from "@/app/(public)/stories/[slug]/_types/public-story-detail-components-props";

// Renders the action inline in the sidebar on desktop and as a fixed bottom
// bar on mobile (one instance, so the dialog and mutation state are shared)
export default function PublicStoryJoinActions({
  story,
}: TPublicStoryDetailProps) {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { auth, authQuery } = useAuthContext();
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

  // Refreshes detail (action_list), the members list (nested key) and the
  // story list (joined_members); all start with STORY.ALL()
  const refreshStory = () =>
    queryClient.invalidateQueries({
      queryKey: [CONFIG.QUERY_KEY.MAIN_API.STORY.ALL()],
    });

  const onActionError = (error: Error) => {
    // 404 is not toasted by the interceptor (story gone or not a member)
    if (error instanceof MainAPINotFoundError) {
      toast.dismiss();
      toast.error(error.message || "This quest could not be found");
    }
    // 400 / 401 / 409 are toasted by the interceptor. A 401 also logs out,
    // which turns this button into "Log in to join". Either way, resync.
    refreshStory();
  };

  const joinMutation = useJoinPublicStory({
    onSuccess: refreshStory,
    onError: onActionError,
  });
  const cancelJoinMutation = useCancelJoinPublicStory({
    onSuccess: refreshStory,
    onError: onActionError,
  });

  const isAuthLoading = !!authQuery?.isLoading;
  const isLoggedOut = !auth && !isAuthLoading;
  const isPublished = story.status === StoryStatusEnum.PUBLISHED;
  const canJoin = story.action_list.is_can_join;
  const canLeave = story.action_list.is_can_cancel_join;
  const showLogin = isLoggedOut && isPublished;
  const isPending = joinMutation.isPending || cancelJoinMutation.isPending;

  if (!showLogin && !canJoin && !canLeave) {
    return null;
  }

  const loginHref = `/login?from=${encodeURIComponent(pathname)}`;

  const hint = showLogin
    ? "Log in to enlist in this quest."
    : canLeave
      ? "Thou art enlisted in this quest."
      : "Anyone may join. The Game Master rewards the bravest at the end.";

  const action = (
    <If condition={showLogin}>
      <Then>
        <Button
          size="lg"
          className="w-full"
          render={<Link href={loginHref} />}
          nativeButton={false}
        >
          <LogIn /> Join the party
        </Button>
      </Then>
      <Else>
        <If condition={canLeave}>
          <Then>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              disabled={isPending}
              onClick={() => setIsLeaveDialogOpen(true)}
            >
              {cancelJoinMutation.isPending ? <Spinner /> : <DoorOpen />}
              Leave the party
            </Button>
          </Then>
          <Else>
            <Button
              size="lg"
              className="w-full"
              disabled={isPending}
              onClick={() => joinMutation.mutate(story.id)}
            >
              {joinMutation.isPending ? <Spinner /> : <Swords />}
              Join the party
            </Button>
          </Else>
        </If>
      </Else>
    </If>
  );

  return (
    <>
      {/* Desktop: inside the sticky sidebar */}
      <div className="hidden flex-col gap-2 px-(--card-spacing) lg:flex">
        {action}
        <p className="text-center text-sm text-foreground/80">{hint}</p>
      </div>

      {/* Mobile/tablet: fixed bottom bar (the page adds bottom padding) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <div className="mx-auto flex max-w-xl flex-col gap-1.5">
          {action}
          <p className="text-center text-xs text-foreground/80 sm:text-sm">
            {hint}
          </p>
        </div>
      </div>

      <AlertDialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave the party?</AlertDialogTitle>
            <AlertDialogDescription>
              Thou shalt be struck from the roster of &ldquo;{story.title}
              &rdquo;. Thou may rejoin while the quest is still open.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={cancelJoinMutation.isPending}
              onClick={() => {
                cancelJoinMutation.mutate(story.id);
                setIsLeaveDialogOpen(false);
              }}
            >
              Leave the party
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
