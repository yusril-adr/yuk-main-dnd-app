export type TUpdateProfilePayload = {
  display_name?: string;
  username?: string;
  bio?: string;
  email?: string;
  // null clears the avatar; omit to leave unchanged
  avatar_file_id?: string | null;
};
