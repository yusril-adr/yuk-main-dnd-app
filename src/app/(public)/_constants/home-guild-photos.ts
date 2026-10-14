import type { THomeGuildPhoto } from "@/app/(public)/_types/home-components-props";

// Add a WebP under /public/images/guild and set `src` to show the real photo
export const HOME_GUILD_PHOTOS: THomeGuildPhoto[] = [
  {
    src: "/images/guild/guild-photo-1.webp",
    alt: "Yuk Main DnD guild members smiling together at a session night",
    caption: "Our first session night",
    objectPosition: "50% 30%",
  },
  {
    src: "/images/guild/guild-photo-2.webp",
    alt: "Yuk Main DnD guild members in costume around the game table, one raising a toy sword",
    caption: "Heroes at the table",
  },
  {
    src: "/images/guild/guild-photo-4.webp",
    alt: "Yuk Main DnD guild members smiling around a table after a meetup",
    caption: "Guild meetup",
    objectPosition: "50% 5%",
  },
];
