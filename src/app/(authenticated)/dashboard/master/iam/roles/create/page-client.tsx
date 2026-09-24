"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import RoleCreateForm from "./_components/role-create-form";
import { useCreateRole } from "@/app/(authenticated)/dashboard/master/iam/roles/_hooks/use-create-role";
import { useGetAllPermissions } from "@/app/(authenticated)/dashboard/master/iam/roles/_hooks/use-get-all-permissions";

export default function RoleCreatePageClient() {
  const router = useRouter();
  const permissionsQuery = useGetAllPermissions();
  const createRoleMutation = useCreateRole({
    onSuccess: () => {
      router.push("/dashboard/master/iam/roles");
    },
  });

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb
          items={[
            { name: "Roles", link: "/dashboard/master/iam/roles" },
            { name: "Create" },
          ]}
        />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href="/dashboard/master/iam/roles">
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">Create Role</h1>
        </div>

        <RoleCreateForm
          permissions={permissionsQuery.data?.data?.data?.items ?? []}
          isPermissionsLoading={permissionsQuery.isLoading}
          onSubmitPayload={createRoleMutation.mutate}
          mutationError={createRoleMutation.error}
          isPending={createRoleMutation.isPending}
          isPaused={createRoleMutation.isPaused}
        />
      </div>
    </div>
  );
}
