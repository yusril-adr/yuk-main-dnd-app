export type TStoryDetailMembersDialogProps = {
  storyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canManageMembers: boolean;
  onAddMember: () => void;
};
