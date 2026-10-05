import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type TStoryDetailSectionCardProps = {
  icon: LucideIcon;
  title: string;
  className?: string;
  children: ReactNode;
};
