"use client";

import { useAuthContext } from "@/app/_hooks/use-auth-context";

import PublicStoryCommentReactorRow from "./public-story-comment-reactor-row";
import type { TPublicStoryCommentReactorPinnedRowProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-reactor-pinned-row-props";

// Your own reaction, first in the list, built from the auth user so it
// shows before the list loads. Gone once my_reaction is null (Remove)
export default function PublicStoryCommentReactorPinnedRow({
  isShown,
  myReaction,
  isCanReact,
  onRemove,
  isRemoving,
}: TPublicStoryCommentReactorPinnedRowProps) {
  const { auth } = useAuthContext();
  if (!isShown || !auth || myReaction === null) return null;

  return (
    <ul className="mb-1 border-b pb-1">
      <PublicStoryCommentReactorRow
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
