import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type TPublicStoryDetailSectionProps = {
  icon: LucideIcon;
  title: string;
  className?: string;
  children: ReactNode;
};
