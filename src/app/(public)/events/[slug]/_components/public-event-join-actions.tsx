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
import { useT } from "@/app/_hooks/use-t";
import CONFIG from "@/common/constants/config";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";

import { useJoinPublicEvent } from "@/app/(public)/events/[slug]/_hooks/use-join-public-event";
import { useCancelJoinPublicEvent } from "@/app/(public)/events/[slug]/_hooks/use-cancel-join-public-event";
import { EVENT_DETAIL_MESSAGES } from "@/app/(public)/events/[slug]/_messages";
import type { TPublicEventDetailProps } from "@/app/(public)/events/[slug]/_types/public-event-detail-props";

// Renders the action inline in the sidebar on desktop and as a fixed bottom
// bar on mobile (one instance, so the dialog and mutation state are shared)
export default function PublicEventJoinActions({
  event,
}: TPublicEventDetailProps) {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { auth, authQuery } = useAuthContext();
  const { t } = useT(EVENT_DETAIL_MESSAGES);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

  // Refreshes detail (action_list), the members list (nested key) and the
  // event list (joined_members); all start with EVENT.ALL()
  const refreshEvent = () =>
    queryClient.invalidateQueries({
      queryKey: [CONFIG.QUERY_KEY.MAIN_API.EVENT.ALL()],
    });

  const onActionError = (error: Error) => {
    // 404 is not toasted by the interceptor (event gone or not a member)
    if (error instanceof MainAPINotFoundError) {
      toast.dismiss();
      toast.error(error.message || t("join.notFound"));
    }
    // 400 / 401 / 409 are toasted by the interceptor. A 401 also logs out,
    // which turns this button into "Log in to join". Either way, resync.
    refreshEvent();
  };

  const joinMutation = useJoinPublicEvent({
    onSuccess: refreshEvent,
    onError: onActionError,
  });
  const cancelJoinMutation = useCancelJoinPublicEvent({
    onSuccess: refreshEvent,
    onError: onActionError,
  });

  const isAuthLoading = !!authQuery?.isLoading;
  const isLoggedOut = !auth && !isAuthLoading;
  const isPublished = event.status === EventStatusEnum.PUBLISHED;
  const canJoin = event.action_list.is_can_join;
  const canLeave = event.action_list.is_can_cancel_join;
  const showLogin = isLoggedOut && isPublished;
  const isPending = joinMutation.isPending || cancelJoinMutation.isPending;
  // max_members is an attendance cap at completion, not a join cap, so
  // anyone can join a published event as registered

  if (!showLogin && !canJoin && !canLeave) {
    return null;
  }

  const loginHref = `/login?from=${encodeURIComponent(pathname)}`;

  const hint = showLogin
    ? t("join.hintLogin")
    : canLeave
      ? t("join.hintEnlisted")
      : t("join.hintAnyone");

  const action = (
    <If condition={showLogin}>
      <Then>
        <Button
          size="lg"
          className="w-full"
          render={<Link href={loginHref} />}
          nativeButton={false}
        >
          <LogIn /> {t("join.joinParty")}
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
              {t("join.leaveParty")}
            </Button>
          </Then>
          <Else>
            <Button
              size="lg"
              className="w-full"
              disabled={isPending}
              onClick={() => joinMutation.mutate(event.id)}
            >
              {joinMutation.isPending ? <Spinner /> : <Swords />}
              {t("join.joinParty")}
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
            <AlertDialogTitle>{t("join.leaveTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("join.leaveDescription", { title: event.title })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:grid sm:grid-cols-2">
            <AlertDialogCancel>{t("join.stay")}</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={cancelJoinMutation.isPending}
              onClick={() => {
                cancelJoinMutation.mutate(event.id);
                setIsLeaveDialogOpen(false);
              }}
            >
              {t("join.leaveParty")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
