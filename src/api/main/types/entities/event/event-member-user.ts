// Member user fields; a soft-deleted user keeps the row and display_name
// gets " (Deleted User)" appended
export type TEventMemberUser = {
  id: string;
  display_name: string;
  username: string | null;
  avatar_url: string | null;
  is_guest: boolean;
};
