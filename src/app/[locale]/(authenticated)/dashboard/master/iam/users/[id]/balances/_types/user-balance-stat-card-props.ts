import type { LucideIcon } from "lucide-react";

export type TUserBalanceStatCardProps = {
  label: string;
  unit: string;
  icon: LucideIcon;
  value: number | null | undefined;
  isLoading?: boolean;
};
