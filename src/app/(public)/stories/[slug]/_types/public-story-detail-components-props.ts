import type { FC, ReactNode, SVGProps } from "react";
import type { LucideIcon } from "lucide-react";

import type { TPublicStoryMemberPaginationResponse } from "@/api/main/modules/stories/[id]/members/types/public-story-member-pagination-response";
import type { TPublicStoryDetailResponse } from "@/api/main/modules/stories/[id]/types/public-story-detail-response";
import type { TStoryCommentPaginationResponse } from "@/api/main/modules/stories/[id]/comments/types/story-comment-pagination-response";

export type TPublicStoryDetailProps = {
  story: TPublicStoryDetailResponse;
  className?: string;
};

export type TPublicStoryDetailSectionProps = {
  icon: LucideIcon;
  title: string;
  className?: string;
  children: ReactNode;
};

export type TPublicStoryDetailInfoRowProps = {
  // Lucide or an SVGR brand icon (e.g. Discord)
  icon: LucideIcon | FC<SVGProps<SVGSVGElement>>;
  label: string;
  value: ReactNode;
};

export type TPublicStoryPartyProps = {
  storyId: string;
  maxMembers: number | null;
  className?: string;
};

export type TPublicStoryPartyMemberProps = {
  member: TPublicStoryMemberPaginationResponse;
};

export type TPublicStoryDetailExternalLinkProps = {
  href: string;
  children: ReactNode;
};

export type TPublicStoryCommentsProps = {
  story: TPublicStoryDetailResponse;
  className?: string;
};

export type TPublicStoryCommentComposerProps = {
  story: TPublicStoryDetailResponse;
};

export type TPublicStoryCommentItemProps = {
  storyId: string;
  comment: TStoryCommentPaginationResponse;
};

export type TPublicStoryCommentFormProps = {
  // Unique per form on the page (labels and aria links)
  id: string;
  label: string;
  defaultContent?: string;
  placeholder?: string;
  submitLabel: string;
  isPending: boolean;
  // Resolve on success (the create form then clears); reject to keep the text
  onSubmit: (content: string) => Promise<unknown>;
  onCancel?: () => void;
  autoFocus?: boolean;
};

export type TPublicStoryCommentDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPending: boolean;
  onConfirm: () => void;
};
