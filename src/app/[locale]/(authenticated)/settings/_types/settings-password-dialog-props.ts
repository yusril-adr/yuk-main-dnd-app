import type { TUpdatePasswordPayload } from "@/api/main/modules/auth/password/types/update-password-payload";

export type TSettingsPasswordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitPayload: (payload: TUpdatePasswordPayload) => void;
  mutationError: Error | null;
  isPending: boolean;
};
