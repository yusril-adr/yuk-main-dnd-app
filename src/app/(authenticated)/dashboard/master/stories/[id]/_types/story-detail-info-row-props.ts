import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type TStoryDetailInfoRowProps = {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  // Shown in muted italics when value is empty
  emptyText: string;
};
