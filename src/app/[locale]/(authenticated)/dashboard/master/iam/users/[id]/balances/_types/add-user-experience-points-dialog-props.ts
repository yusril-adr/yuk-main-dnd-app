import type { TAddUserExperiencePointsPayload } from "@/api/main/modules/master/iam/users/[id]/experience-points/types/add-user-experience-points-payload";

export type TAddUserExperiencePointsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitPayload: (payload: TAddUserExperiencePointsPayload) => void;
  mutationError: Error | null;
  isPending: boolean;
};
