export type TStoryDetailActionsProps = {
  storyId: string;
  canEdit: boolean;
  canPublish: boolean;
  canArchive: boolean;
  canUnarchive: boolean;
  canCancel: boolean;
  canDelete: boolean;
  isPublishPending: boolean;
  isArchivePending: boolean;
  isUnarchivePending: boolean;
  isCancelPending: boolean;
  onPublishClick: () => void;
  onArchiveClick: () => void;
  onUnarchiveClick: () => void;
  onCancelClick: () => void;
  onDeleteClick: () => void;
};
