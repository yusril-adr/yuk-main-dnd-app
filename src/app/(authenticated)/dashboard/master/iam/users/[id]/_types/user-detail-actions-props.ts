export type TUserDetailActionsProps = {
  userId: string;
  canEdit: boolean;
  canDelete: boolean;
  onDeleteClick: () => void;
};
