export type TPublicStoryBannerProps = {
  bannerUrl: string | null;
  title: string;
  className?: string;
  iconClassName?: string;
  // next/image sizes; defaults to the list grid columns
  sizes?: string;
  // Above-the-fold image (detail hero): load eagerly
  priority?: boolean;
};
