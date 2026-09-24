"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { Button } from "@/app/_components/ui/button";
import { PermissionEnum } from "@/common/enums/permission";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";

import RoleDetail from "@/app/(authenticated)/dashboard/master/iam/roles/_components/role-detail";
import { useGetRoleById } from "@/app/(authenticated)/dashboard/master/iam/roles/_hooks/use-get-role-by-id";

export default function RoleDetailPageClient() {
  const { auth } = useAuthContext();
  const { id } = useParams();
  const router = useRouter();
  const roleId = id as string;
  const roleQuery = useGetRoleById(roleId);
  const role = roleQuery.data?.data?.data;
  const canUpdateRoles = auth?.permissions.includes(PermissionEnum.ROLES_UPDATE);

  useEffect(() => {
    if (roleQuery.isError && roleQuery.error instanceof MainAPINotFoundError) {
      router.push("/dashboard/master/iam/roles");
    }
  }, [roleQuery.error, roleQuery.isError, router]);

  const breadcrumbItems = useMemo(
    () => [
      { name: "Roles", link: "/dashboard/master/iam/roles" },
      { name: role?.name ?? "Detail" },
    ],
    [role?.name],
  );

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb items={breadcrumbItems} />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href="/dashboard/master/iam/roles">
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">Role Detail</h1>
          {canUpdateRoles && role && (
            <Button
              className="ms-auto"
              render={
                <Link href={`/dashboard/master/iam/roles/${roleId}/edit`} />
              }
              nativeButton={false}
            >
              <Pencil /> Edit
            </Button>
          )}
        </div>

        <RoleDetail role={role} isLoading={roleQuery.isLoading} />
      </div>
    </div>
  );
}
