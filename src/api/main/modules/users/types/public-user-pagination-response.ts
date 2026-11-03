export type TPublicUserRole = {
  id: string;
  key: string;
  name: string;
};

// Public guildmate; roles are only those flagged as shown in public
export type TPublicUserPaginationResponse = {
  id: string;
  username: string | null;
  display_name: string;
  avatar_url: string | null;
  dm_exp: number;
  dm_level: number;
  player_exp: number;
  player_level: number;
  roles: TPublicUserRole[];
};
