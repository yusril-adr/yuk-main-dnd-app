"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import CONFIG from "@/common/constants/config";
import UserCreateForm from "./_components/user-create-form";
import { useCreateUser } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-create-user";
import { useAvatarUploadFile } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-avatar-upload-file";
import { useGetRolePagination } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-get-role-pagination";

export default function UserCreatePageClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [roleSearch, setRoleSearch] = useState("");
  const [avatarFileId, setAvatarFileId] = useState<string | null>(null);

  const rolesQuery = useGetRolePagination(roleSearch || undefined);
  const createUserMutation = useCreateUser({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.USER.ALL()],
      });
      router.push("/dashboard/master/iam/users");
    },
  });

  const avatarUploadMutation = useAvatarUploadFile({
    onSuccess: (response) => {
      setAvatarFileId(response.data.data.id);
    },
  });

  const onUploadAvatar = useCallback(
    (file: File) => {
      avatarUploadMutation.mutate({ file });
    },
    [avatarUploadMutation],
  );

  const roleItems = (rolesQuery.data?.data?.data?.items ?? []).map(
    (role) => ({
      value: role.id,
      label: role.name,
    }),
  );

  return (
    <div className="w-full flex justify-center">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb
          items={[
            { name: "Users", link: "/dashboard/master/iam/users" },
            { name: "Create" },
          ]}
        />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href="/dashboard/master/iam/users">
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">Create User</h1>
        </div>

        <UserCreateForm
          roles={roleItems}
          isRolesLoading={rolesQuery.isLoading}
          roleSearch={roleSearch}
          onRoleSearchChange={setRoleSearch}
          onSubmitPayload={createUserMutation.mutate}
          mutationError={createUserMutation.error}
          isPending={createUserMutation.isPending}
          isPaused={createUserMutation.isPaused}
          onUploadAvatar={onUploadAvatar}
          isUploadingAvatar={avatarUploadMutation.isPending}
          avatarFileId={avatarFileId}
        />
      </main>
    </div>
  );
}