export type TStoryCardBannerProps = {
  bannerUrl?: string | null;
  title: string;
  // Extra classes for the image, e.g. a different max height
  imageClassName?: string;
  // Extra classes for the no-banner placeholder, e.g. a fixed height instead of 16:9
  placeholderClassName?: string;
};
