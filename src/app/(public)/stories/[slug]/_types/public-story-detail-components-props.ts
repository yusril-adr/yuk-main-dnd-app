import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import type { TPublicStoryMemberPaginationResponse } from "@/api/main/modules/stories/[id]/members/types/public-story-member-pagination-response";
import type { TPublicStoryDetailResponse } from "@/api/main/modules/stories/[id]/types/public-story-detail-response";

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
  icon: LucideIcon;
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
