"use client";

import { useAuthContext } from "@/app/_hooks/use-auth-context";

import PublicEventCommentReactorRow from "./public-event-comment-reactor-row";
import type { TPublicEventCommentReactorPinnedRowProps } from "@/app/(public)/events/[slug]/_types/public-event-comment-reactor-pinned-row-props";

// Your own reaction, first in the list, built from the auth user so it
// shows before the list loads. Gone once my_reaction is null (Remove)
export default function PublicEventCommentReactorPinnedRow({
  isShown,
  myReaction,
  isCanReact,
  onRemove,
  isRemoving,
}: TPublicEventCommentReactorPinnedRowProps) {
  const { auth } = useAuthContext();
  if (!isShown || !auth || myReaction === null) return null;

  return (
    <ul className="mb-1 border-b pb-1">
      <PublicEventCommentReactorRow
        type={myReaction}
        user={{
          id: auth.id,
          display_name: auth.display_name,
          username: auth.username,
          avatar_url: auth.avatar_url ?? null,
          is_guest: auth.is_guest,
        }}
        isMine
        isCanRemove={isCanReact}
        onRemove={onRemove}
        isRemoving={isRemoving}
      />
    </ul>
  );
}
