import type { TUserResponse } from "../types/user-response";

export type TUserSortBy = Exclude<keyof TUserResponse, "roles">;
