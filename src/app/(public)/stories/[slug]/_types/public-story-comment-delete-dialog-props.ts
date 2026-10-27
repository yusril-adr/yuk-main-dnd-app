export type TPublicStoryCommentDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPending: boolean;
  onConfirm: () => void;
  noun?: "comment" | "reply";
};
