import type { LucideIcon } from "lucide-react";

import type { TPublicUserDetailResponse } from "@/api/main/modules/users/types/public-user-detail-response";

export type TPublicGuildmateAdventurerCardProps = {
  guildmate: TPublicUserDetailResponse;
};

export type TPublicGuildmateStatRowProps = {
  icon: LucideIcon;
  label: string;
  exp: number;
  share: number;
};

export type TPublicGuildmateStoriesSectionProps = {
  identifier: string;
};

export type TPublicGuildmateAdventurerCardBackProps = {
  cardNumber: string;
};
