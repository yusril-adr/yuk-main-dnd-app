import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type TStoryDetailSectionCardProps = {
  icon: LucideIcon;
  title: string;
  className?: string;
  // Optional control shown at the right of the header (e.g. an icon button)
  action?: ReactNode;
  children: ReactNode;
};
