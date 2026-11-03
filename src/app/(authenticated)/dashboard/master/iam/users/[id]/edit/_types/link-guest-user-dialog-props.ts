export type TLinkGuestUserDialogProps = {
  guestId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (userId: string) => void;
  isPending: boolean;
};
