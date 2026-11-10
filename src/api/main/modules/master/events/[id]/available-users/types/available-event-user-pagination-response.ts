import type { TEventMemberUser } from "@/api/main/types/entities/event/event-member-user";

export type TAvailableEventUserPaginationResponse = Omit<
  TEventMemberUser,
  "username"
> & {
  username?: string | null;
};
