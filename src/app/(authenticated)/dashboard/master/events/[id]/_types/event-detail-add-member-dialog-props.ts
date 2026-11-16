export type TEventDetailAddMemberDialogProps = {
  eventId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canCreateGuestUser: boolean;
};
