export type TStoryDetailActionsProps = {
  storyId: string;
  canEdit: boolean;
  canArchive: boolean;
  canUnarchive: boolean;
  canDelete: boolean;
  isArchivePending: boolean;
  isUnarchivePending: boolean;
  onArchiveClick: () => void;
  onUnarchiveClick: () => void;
  onDeleteClick: () => void;
};
