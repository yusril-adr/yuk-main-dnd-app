import type { TSwitchRolePayload } from "@/api/main/modules/auth/switch-role/types/switch-role-payload";
import type { TUserMeResponse } from "@/api/main/modules/auth/me/types/user-me-response";

export type TSwitchRoleFormProps = {
  user: TUserMeResponse;
  onSubmitPayload: (payload: TSwitchRolePayload) => void;
  mutationError: Error | null;
  isPending: boolean;
  isPaused: boolean;
};
