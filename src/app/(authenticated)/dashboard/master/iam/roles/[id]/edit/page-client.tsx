"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import RoleEditForm from "./_components/role-edit-form";
import { useGetAllPermissions } from "@/app/(authenticated)/dashboard/master/iam/roles/_hooks/use-get-all-permissions";
import { useGetRoleById } from "@/app/(authenticated)/dashboard/master/iam/roles/_hooks/use-get-role-by-id";
import { useUpdateRoleById } from "@/app/(authenticated)/dashboard/master/iam/roles/_hooks/use-update-role-by-id";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import CONFIG from "@/common/constants/config";

export default function RoleEditPageClient() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const roleId = id as string;
  const roleQuery = useGetRoleById(roleId);
  const permissionsQuery = useGetAllPermissions();
  const updateRoleMutation = useUpdateRoleById({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.ROLE.ALL()],
      });
      router.push(`/dashboard/master/iam/roles/${roleId}`);
    },
    onError: (error) => {
      if (error instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/iam/roles");
      }
    },
  });
  const role = roleQuery.data?.data?.data;
  useEffect(() => {
    if (roleQuery.isError && roleQuery.error instanceof MainAPINotFoundError) {
      notFound();
    }
  }, [roleQuery.error, roleQuery.isError, router]);

  return (
    <div className="w-full flex justify-center">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb
          items={[
            { name: "Roles", link: "/dashboard/master/iam/roles" },
            ...(role
              ? [
                  {
                    name: role.name,
                    link: `/dashboard/master/iam/roles/${roleId}`,
                  },
                ]
              : []),
            { name: "Edit" },
          ]}
        />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href={`/dashboard/master/iam/roles/${roleId}`}>
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">Edit Role</h1>
        </div>

        <RoleEditForm
          name={role?.name}
          description={role?.description}
          isShowInPublic={role?.is_show_in_public}
          permissionIds={role?.permissions?.map((permission) => permission.id)}
          permissions={permissionsQuery.data?.data?.data?.items ?? []}
          isLoading={roleQuery.isLoading}
          isPermissionsLoading={permissionsQuery.isLoading}
          onSubmitPayload={(payload) =>
            updateRoleMutation.mutate({ id: roleId, payload })
          }
          mutationError={updateRoleMutation.error}
          isPending={updateRoleMutation.isPending}
          isPaused={updateRoleMutation.isPaused}
        />
      </main>
    </div>
  );
}
