import type { TAddUserPointsPayload } from "@/api/main/modules/master/iam/users/[id]/points/types/add-user-points-payload";

export type TAddUserPointsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitPayload: (payload: TAddUserPointsPayload) => void;
  mutationError: Error | null;
  isPending: boolean;
};
