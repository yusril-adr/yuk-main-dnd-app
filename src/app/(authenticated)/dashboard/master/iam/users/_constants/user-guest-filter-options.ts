import { UserGuestFilterEnum } from "@/app/(authenticated)/dashboard/master/iam/users/_enums/user-guest-filter";

// `null` means no filter is applied (show all users)
export const USER_GUEST_FILTER_OPTIONS = [
  { labelKey: "all" as const, value: null },
  { labelKey: "users" as const, value: UserGuestFilterEnum.USERS },
  { labelKey: "guests" as const, value: UserGuestFilterEnum.GUESTS },
];
