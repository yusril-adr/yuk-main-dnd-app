export type TPublicStoryCommentFormProps = {
  // Unique per form on the page (labels and aria links)
  id: string;
  label: string;
  defaultContent?: string;
  placeholder?: string;
  submitLabel: string;
  isPending: boolean;
  // Resolve on success (the create form then clears); reject to keep the text
  onSubmit: (content: string) => Promise<unknown>;
  onCancel?: () => void;
  autoFocus?: boolean;
  // Bump requestId to merge "@username " into the text and focus the end
  mention?: { username: string; requestId: number } | null;
};
