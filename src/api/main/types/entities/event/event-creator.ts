import type { TUserEntity } from "../iam/user-entity";

// Creator fields the events endpoints send: avatar_url is always present
// (null when unset); list items omit username
export type TEventCreator = Pick<TUserEntity, "id" | "display_name"> & {
  username?: string | null;
  avatar_url: string | null;
};
