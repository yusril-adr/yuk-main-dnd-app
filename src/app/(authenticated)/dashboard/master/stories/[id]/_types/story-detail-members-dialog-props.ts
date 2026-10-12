export type TStoryDetailMembersDialogProps = {
  storyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canAddMembers: boolean;
  canRemoveMembers: boolean;
  onDeleteMember: () => void;
  onAddMember: () => void;
};
