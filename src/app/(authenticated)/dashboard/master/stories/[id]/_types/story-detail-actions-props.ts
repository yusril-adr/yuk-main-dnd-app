export type TStoryDetailActionsProps = {
  storyId: string;
  canEdit: boolean;
  canArchive: boolean;
  canDelete: boolean;
  isArchivePending: boolean;
  onArchiveClick: () => void;
  onDeleteClick: () => void;
};
