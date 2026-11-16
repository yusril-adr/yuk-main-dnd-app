import type { FC, ReactNode, SVGProps } from "react";
import type { LucideIcon } from "lucide-react";

import type { TBoardEventDetailResponse } from "@/api/main/modules/board/events/[id]/types/board-event-detail-response";
import type { TBoardEventMemberPaginationResponse } from "@/api/main/modules/board/events/[id]/types/board-event-member-pagination-response";

export type TBoardEventDetailCardProps = {
  event: TBoardEventDetailResponse;
  className?: string;
};

export type TBoardEventDetailSlugProps = {
  slug: string;
  // action_list.is_can_view_public: the public event page shows this event
  isCanViewPublic: boolean;
};

export type TBoardEventDetailSectionCardProps = {
  icon: LucideIcon;
  title: string;
  className?: string;
  // Optional control at the right of the header (e.g. an icon button)
  action?: ReactNode;
  children: ReactNode;
};

export type TBoardEventDetailInfoRowProps = {
  // Lucide or an SVGR brand icon
  icon: LucideIcon | FC<SVGProps<SVGSVGElement>>;
  label: string;
  value: ReactNode;
  // Shown in muted italics when value is empty
  emptyText: string;
};

export type TBoardEventDetailCopyDescriptionButtonProps = {
  description: string;
};

export type TBoardEventDetailMemberRowProps = {
  member: TBoardEventMemberPaginationResponse;
  variant: "avatar" | "detail";
};

export type TBoardEventDetailMembersCardProps = {
  eventId: string;
};

export type TBoardEventDetailMembersDialogProps = {
  eventId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type TBoardEventDetailExternalLinkProps = {
  href: string;
  children: ReactNode;
};
