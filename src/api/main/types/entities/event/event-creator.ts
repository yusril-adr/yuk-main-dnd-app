// Creator fields the events endpoints send. List items omit username
export type TEventCreator = {
  id: string;
  display_name: string;
  username?: string | null;
  avatar_url: string | null;
};
