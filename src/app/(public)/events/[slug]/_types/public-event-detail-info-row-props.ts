import type { FC, ReactNode, SVGProps } from "react";
import type { LucideIcon } from "lucide-react";

export type TPublicEventDetailInfoRowProps = {
  // Lucide or an SVGR brand icon
  icon: LucideIcon | FC<SVGProps<SVGSVGElement>>;
  label: string;
  value: ReactNode;
};
