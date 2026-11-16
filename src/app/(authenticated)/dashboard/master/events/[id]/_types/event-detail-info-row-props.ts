import type { FC, ReactNode, SVGProps } from "react";
import type { LucideIcon } from "lucide-react";

export type TEventDetailInfoRowProps = {
  // Lucide or an SVGR brand icon
  icon: LucideIcon | FC<SVGProps<SVGSVGElement>>;
  label: string;
  value: ReactNode;
  // Shown in muted italics when value is empty
  emptyText: string;
};
