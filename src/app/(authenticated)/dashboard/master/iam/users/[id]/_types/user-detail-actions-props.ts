export type TUserDetailActionsProps = {
  userId: string;
  canViewBalances: boolean;
  canEdit: boolean;
  canDelete: boolean;
  onDeleteClick: () => void;
};
