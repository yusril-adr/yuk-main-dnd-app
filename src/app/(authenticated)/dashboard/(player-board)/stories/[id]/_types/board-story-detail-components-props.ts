import type { FC, ReactNode, SVGProps } from "react";
import type { LucideIcon } from "lucide-react";

import type { TBoardStoryDetailResponse } from "@/api/main/modules/board/stories/[id]/types/board-story-detail-response";
import type { TBoardStoryMemberPaginationResponse } from "@/api/main/modules/board/stories/[id]/types/board-story-member-pagination-response";

export type TBoardStoryDetailCardProps = {
  story: TBoardStoryDetailResponse;
  className?: string;
};

export type TBoardStoryDetailSectionCardProps = {
  icon: LucideIcon;
  title: string;
  className?: string;
  // Optional control at the right of the header (e.g. an icon button)
  action?: ReactNode;
  children: ReactNode;
};

export type TBoardStoryDetailInfoRowProps = {
  // Lucide or an SVGR brand icon (e.g. Discord)
  icon: LucideIcon | FC<SVGProps<SVGSVGElement>>;
  label: string;
  value: ReactNode;
  // Shown in muted italics when value is empty
  emptyText: string;
};

export type TBoardStoryDetailCopyDescriptionButtonProps = {
  description: string;
};

export type TBoardStoryDetailMemberRowProps = {
  member: TBoardStoryMemberPaginationResponse;
  variant: "avatar" | "detail";
};

export type TBoardStoryDetailMembersCardProps = {
  storyId: string;
};

export type TBoardStoryDetailMembersDialogProps = {
  storyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type TBoardStoryDetailExternalLinkProps = {
  href: string;
  children: ReactNode;
};
