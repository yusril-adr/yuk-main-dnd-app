export type TUpdateProfilePayload = {
  display_name?: string;
  // null clears username / bio; omit to leave unchanged
  username?: string | null;
  bio?: string | null;
  email?: string;
  // null clears the avatar; omit to leave unchanged
  avatar_file_id?: string | null;
};
