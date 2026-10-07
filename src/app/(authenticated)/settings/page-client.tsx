"use client";

import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import CONFIG from "@/common/constants/config";
import { useAuthContext } from "@/app/_hooks/use-auth-context";

import SettingsProfileForm from "./_components/settings-profile-form";
import SettingsPasswordDialog from "./_components/settings-password-dialog";
import { useUpdateProfile } from "./_hooks/use-update-profile";
import { useUpdatePassword } from "./_hooks/use-update-password";
import { useSettingsAvatarUpload } from "./_hooks/use-settings-avatar-upload";

export default function SettingsPageClient() {
  const { auth, authQuery } = useAuthContext();
  const queryClient = useQueryClient();

  const [avatarFileId, setAvatarFileId] = useState<string | null>(null);
  const [isAvatarRemoved, setIsAvatarRemoved] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const {
    mutate: updateProfileMutate,
    error: updateProfileError,
    isPending: updateProfileIsPending,
    isPaused: updateProfileIsPaused,
  } = useUpdateProfile({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CONFIG.QUERY_KEY.MAIN_API.AUTH.ME(),
      });
      setAvatarFileId(null);
      setIsAvatarRemoved(false);
    },
  });

  const {
    mutate: updatePasswordMutate,
    error: updatePasswordError,
    isPending: updatePasswordIsPending,
  } = useUpdatePassword({
    onSuccess: () => {
      setIsPasswordOpen(false);
    },
  });

  const avatarUploadMutation = useSettingsAvatarUpload({
    onSuccess: (response) => {
      setAvatarFileId(response.data.data.id);
      setIsAvatarRemoved(false);
    },
  });

  const onUploadAvatar = useCallback(
    (file: File) => {
      avatarUploadMutation.mutate({ file });
    },
    [avatarUploadMutation],
  );

  const breadcrumbItems = [{ name: "Settings" }];

  return (
    <div className="flex w-full justify-center">
      <main className="flex w-full max-w-7xl flex-col px-10 pb-10">
        <AppBreadcrumb items={breadcrumbItems} />

        <div className="mt-4 mb-6 flex items-center gap-x-2">
          <h1 className="font-heading text-2xl">Settings</h1>
        </div>

        <SettingsProfileForm
          email={auth?.email ?? ""}
          username={auth?.username}
          displayName={auth?.display_name ?? ""}
          bio={auth?.bio}
          avatarUrl={auth?.avatar_url}
          isLoading={!!authQuery?.isLoading}
          onSubmitPayload={updateProfileMutate}
          mutationError={updateProfileError}
          isPending={updateProfileIsPending}
          isPaused={updateProfileIsPaused}
          onUploadAvatar={onUploadAvatar}
          isUploadingAvatar={avatarUploadMutation.isPending}
          avatarFileId={avatarFileId}
          isAvatarRemoved={isAvatarRemoved}
          onAvatarRemovedChange={setIsAvatarRemoved}
          onChangePasswordClick={() => setIsPasswordOpen(true)}
        />

        <SettingsPasswordDialog
          open={isPasswordOpen}
          onOpenChange={setIsPasswordOpen}
          onSubmitPayload={updatePasswordMutate}
          mutationError={updatePasswordError}
          isPending={updatePasswordIsPending}
        />
      </main>
    </div>
  );
}
