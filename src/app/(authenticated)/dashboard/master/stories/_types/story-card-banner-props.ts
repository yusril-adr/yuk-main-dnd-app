export type TStoryCardBannerProps = {
  bannerUrl?: string | null;
  title: string;
  // Overrides the default 16:9 sizing (e.g. a fixed height on the detail hero)
  className?: string;
};
