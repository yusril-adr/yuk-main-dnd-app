"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import CONFIG from "@/common/constants/config";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import UserEditForm from "./_components/user-edit-form";
import { useGetUserById } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-get-user-by-id";
import { useUpdateUserById } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-update-user-by-id";
import { useAvatarUploadFile } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-avatar-upload-file";
import { useGetRolePagination } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-get-role-pagination";

export default function UserEditPageClient() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const userId = params.id as string;

  const [roleSearch, setRoleSearch] = useState("");
  const [avatarFileId, setAvatarFileId] = useState<string | null>(null);

  const getDataQuery = useGetUserById(userId);
  const user = getDataQuery.data?.data?.data;

  const rolesQuery = useGetRolePagination(roleSearch || undefined);

  const {
    mutate: updateUserMutate,
    error: updateUserError,
    isPending: updateUserIsPending,
    isPaused: updateUserIsPaused,
  } = useUpdateUserById({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.USER.ALL()],
      });
      router.push(`/dashboard/master/iam/users/${userId}`);
    },
    onError: (error) => {
      if (error instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/iam/users");
      }
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

  useEffect(() => {
    if (getDataQuery.isError && getDataQuery.error instanceof MainAPINotFoundError) {
      router.push("/dashboard/master/iam/users");
    }
  }, [getDataQuery.error, getDataQuery.isError, router]);

  const breadcrumbItems = [
    { name: "Users", link: "/dashboard/master/iam/users" },
    ...(!getDataQuery.isLoading
      ? [{ name: user?.display_name ?? "Detail", link: `/dashboard/master/iam/users/${userId}` }]
      : []),
    { name: "Edit" },
  ];

  return (
    <div className="w-full flex justify-center">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb items={breadcrumbItems} />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href={`/dashboard/master/iam/users/${userId}`}>
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">Edit User</h1>
        </div>

        <UserEditForm
          roles={roleItems}
          isRolesLoading={rolesQuery.isLoading}
          roleSearch={roleSearch}
          onRoleSearchChange={setRoleSearch}
          email={user?.email}
          username={user?.username}
          displayName={user?.display_name}
          bio={user?.bio}
          avatarUrl={user?.avatar_url}
          roleIds={user?.roles?.map((r) => r.id)}
          isLoading={getDataQuery.isLoading}
          onSubmitPayload={(payload) =>
            updateUserMutate({ id: userId, payload })
          }
          mutationError={updateUserError}
          isPending={updateUserIsPending}
          isPaused={updateUserIsPaused}
          onUploadAvatar={onUploadAvatar}
          isUploadingAvatar={avatarUploadMutation.isPending}
          avatarFileId={avatarFileId}
        />
      </main>
    </div>
  );
}