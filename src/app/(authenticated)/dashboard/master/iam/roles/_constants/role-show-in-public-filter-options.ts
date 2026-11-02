import { RoleShowInPublicFilterEnum } from "@/app/(authenticated)/dashboard/master/iam/roles/_enums/role-show-in-public-filter";

// `null` means no filter is applied (show all roles)
export const ROLE_SHOW_IN_PUBLIC_FILTER_OPTIONS = [
  { labelKey: "all" as const, value: null },
  { labelKey: "yes" as const, value: RoleShowInPublicFilterEnum.YES },
  { labelKey: "no" as const, value: RoleShowInPublicFilterEnum.NO },
];
