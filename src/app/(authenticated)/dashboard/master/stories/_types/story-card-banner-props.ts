import type { ImageProps } from "next/image";

export type TStoryCardBannerProps = {
  bannerUrl?: string | null;
  title: string;
  // next/image sizes; defaults to the story card grid columns
  sizes?: string;
  // Preload in <head>: only for the page's single LCP image (detail hero)
  preload?: boolean;
  // "eager" for other above-the-fold banners; ignored when preloading
  loading?: ImageProps["loading"];
  // Extra classes for the image, e.g. a different max height
  imageClassName?: string;
  // Extra classes for the no-banner placeholder, e.g. a fixed height instead of 16:9
  placeholderClassName?: string;
};
