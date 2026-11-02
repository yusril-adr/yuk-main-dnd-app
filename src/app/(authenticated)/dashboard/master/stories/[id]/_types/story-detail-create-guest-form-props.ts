import type { TGuestUserCreatePayload } from "@/api/main/modules/master/iam/users/guests/types/guest-user-create-payload";

export type TStoryDetailCreateGuestFormProps = {
  defaultDisplayName?: string;
  isPending: boolean;
  mutationError: Error | null;
  onCancel: () => void;
  onSubmitPayload: (payload: TGuestUserCreatePayload) => void;
};
