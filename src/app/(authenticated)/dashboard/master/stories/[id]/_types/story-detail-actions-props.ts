export type TStoryDetailActionsProps = {
  storyId: string;
  canEdit: boolean;
  canPublish: boolean;
  canArchive: boolean;
  canUnarchive: boolean;
  canDelete: boolean;
  isPublishPending: boolean;
  isArchivePending: boolean;
  isUnarchivePending: boolean;
  onPublishClick: () => void;
  onArchiveClick: () => void;
  onUnarchiveClick: () => void;
  onDeleteClick: () => void;
};
