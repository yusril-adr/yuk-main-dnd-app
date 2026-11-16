import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type TPublicEventDetailSectionProps = {
  icon: LucideIcon;
  title: string;
  className?: string;
  children: ReactNode;
};
