import { RoleShowInPublicFilterEnum } from "@/app/(authenticated)/dashboard/master/iam/roles/_enums/role-show-in-public-filter";

// `null` means no filter is applied (show all roles)
export const ROLE_SHOW_IN_PUBLIC_FILTER_OPTIONS = [
  { label: "All", value: null },
  { label: "Yes", value: RoleShowInPublicFilterEnum.YES },
  { label: "No", value: RoleShowInPublicFilterEnum.NO },
];
