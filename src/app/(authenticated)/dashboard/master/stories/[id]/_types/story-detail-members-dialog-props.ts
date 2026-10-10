export type TStoryDetailMembersDialogProps = {
  storyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canManageMembers: boolean;
  onDeleteMember: () => void;
  onAddMember: () => void;
};
