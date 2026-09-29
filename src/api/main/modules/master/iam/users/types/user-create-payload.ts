export type TUserCreatePayload = {
  username?: string;
  email: string;
  password: string;
  display_name: string;
  avatar_file_id?: string;
  bio?: string;
  role_ids?: string[];
};
