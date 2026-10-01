import type { TUserUpdatePayload } from "@/api/main/modules/master/iam/users/[id]/types/user-update-payload";

export type TUserEditFormProps = {
  roles: { value: string; label: string }[];
  isRolesLoading: boolean;
  roleSearch: string;
  onRoleSearchChange: (search: string) => void;
  email: string | undefined;
  username: string | undefined;
  displayName: string | undefined;
  bio: string | undefined;
  avatarUrl: string | undefined;
  roleIds: string[] | undefined;
  isLoading: boolean;
  onSubmitPayload: (payload: TUserUpdatePayload) => void;
  mutationError: Error | null;
  isPending: boolean;
  isPaused: boolean;
  onUploadAvatar: (file: File) => void;
  isUploadingAvatar: boolean;
  avatarFileId: string | null;
};