import type { TUserCreatePayload } from "@/api/main/modules/master/iam/users/types/user-create-payload";

export type TUserCreateFormProps = {
  roles: { value: string; label: string }[];
  isRolesLoading: boolean;
  roleSearch: string;
  onRoleSearchChange: (search: string) => void;
  onSubmitPayload: (payload: TUserCreatePayload) => void;
  mutationError: Error | null;
  isPending: boolean;
  isPaused: boolean;
  onUploadAvatar: (file: File) => void;
  isUploadingAvatar: boolean;
  avatarFileId: string | null;
};