import type { THomeGuildPhoto } from "@/app/(public)/_types/home-components-props";

// Add a WebP under /public/images/guild and set `src` to show the real photo.
// `id` maps to messages home.guild.photos.<id>
export const HOME_GUILD_PHOTOS: THomeGuildPhoto[] = [
  {
    id: "sessionNight",
    src: "/images/guild/guild-photo-1.webp",
    objectPosition: "50% 30%",
  },
  {
    id: "heroesAtTable",
    src: "/images/guild/guild-photo-2.webp",
  },
  {
    id: "afterSession",
    src: "/images/guild/guild-photo-4.webp",
    objectPosition: "50% 5%",
  },
];
