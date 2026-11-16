export type TEventDetailMembersDialogProps = {
  eventId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canAddMembers: boolean;
  canRemoveMembers: boolean;
  onDeleteMember: () => void;
  onAddMember: () => void;
};
