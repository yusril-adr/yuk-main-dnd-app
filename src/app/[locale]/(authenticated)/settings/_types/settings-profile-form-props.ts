import type { TUpdateProfilePayload } from "@/api/main/modules/auth/profile/types/update-profile-payload";

export type TSettingsProfileFormProps = {
  email: string;
  username?: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string | null;
  isLoading: boolean;
  onSubmitPayload: (payload: TUpdateProfilePayload) => void;
  mutationError: Error | null;
  isPending: boolean;
  isPaused: boolean;
  onUploadAvatar: (file: File) => void;
  isUploadingAvatar: boolean;
  avatarFileId: string | null;
  // Existing avatar was removed → send avatar_file_id: null
  isAvatarRemoved: boolean;
  onAvatarRemovedChange: (removed: boolean) => void;
  onChangePasswordClick: () => void;
};
