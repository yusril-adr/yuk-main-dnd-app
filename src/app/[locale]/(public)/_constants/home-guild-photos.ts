import type { THomeGuildPhotoSource } from "@/app/[locale]/(public)/_types/home-components-props";

// Add a WebP under /public/images/guild and set `src` to show the real photo.
// Alt text and caption live in home.guild.photos.<key> (_messages)
export const HOME_GUILD_PHOTOS: THomeGuildPhotoSource[] = [
  {
    key: "sessionNight",
    src: "/images/guild/guild-photo-1.webp",
    objectPosition: "50% 30%",
  },
  {
    key: "heroesAtTable",
    src: "/images/guild/guild-photo-2.webp",
  },
  {
    key: "afterSession",
    src: "/images/guild/guild-photo-4.webp",
    objectPosition: "50% 5%",
  },
];
