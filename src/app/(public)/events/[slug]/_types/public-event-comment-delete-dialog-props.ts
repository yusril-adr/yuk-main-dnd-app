export type TPublicEventCommentDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPending: boolean;
  onConfirm: () => void;
  noun?: string;
};
