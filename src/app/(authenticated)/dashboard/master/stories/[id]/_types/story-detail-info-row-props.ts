import type { FC, ReactNode, SVGProps } from "react";
import type { LucideIcon } from "lucide-react";

export type TStoryDetailInfoRowProps = {
  // Lucide or an SVGR brand icon (e.g. Discord)
  icon: LucideIcon | FC<SVGProps<SVGSVGElement>>;
  label: string;
  value: ReactNode;
  // Shown in muted italics when value is empty
  emptyText: string;
};
