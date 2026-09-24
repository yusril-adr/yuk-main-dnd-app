export type TUserCreatePayload = {
  username?: string;
  email: string;
  password: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  role_ids?: string[];
};
