import type { TPublicStoryPaginationResponse } from "@/api/main/modules/stories/types/public-story-pagination-response";

export type THomeSectionHeaderProps = {
  id: string;
  title: string;
  description: string;
  linkHref?: string;
  linkLabel?: string;
};

export type THomeBandProps = {
  id?: string;
  labelledBy?: string;
  muted?: boolean;
  className?: string;
  children: React.ReactNode;
};

export type THomeStoryCardProps = {
  story: TPublicStoryPaginationResponse;
};

export type THomeEmptyStateProps = {
  text: string;
};

export type THomeErrorStateProps = {
  text: string;
  onRetry: () => void;
};

export type THomeGuildPhotoId =
  | "sessionNight"
  | "heroesAtTable"
  | "afterSession";

export type THomeGuildPhoto = {
  id: THomeGuildPhotoId;
  src?: string;
  // CSS object-position to keep faces in frame when cropped to 16:9
  objectPosition?: string;
};

export type THomeGuildSlideProps = {
  photo: THomeGuildPhoto;
  // Opens the enlarged view; only photos with a src are clickable
  onOpen?: () => void;
};

export type THomeGuildPhotoDialogProps = {
  photos: THomeGuildPhoto[];
  // Index into photos, null when closed
  openIndex: number | null;
  onOpenIndexChange: (index: number | null) => void;
};

export type THomeGuildPhotoPaginationProps = {
  // 1-based position among viewable photos
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};
