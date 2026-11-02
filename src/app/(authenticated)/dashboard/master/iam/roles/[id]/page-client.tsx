"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { If, Then, Else } from "react-if";
import { useParams, useRouter, notFound } from "next/navigation";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/app/_components/ui/table";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import dayjs from "@/libs/dayjs";

import RoleGroupedPermissionList from "./_components/role-grouped-permission-list";
import { useDeleteRoleById } from "@/app/(authenticated)/dashboard/master/iam/roles/_hooks/use-delete-role-by-id";
import { useGetRoleById } from "@/app/(authenticated)/dashboard/master/iam/roles/_hooks/use-get-role-by-id";
import { groupPermissionsByModule } from "../_utils/group-permissions-by-module";
import { MASTER_ROLES_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/roles/[id]/_messages";

export default function RoleDetailPageClient() {
  const { t } = useT(MASTER_ROLES_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const { id } = useParams();
  const router = useRouter();
  const roleId = id as string;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const roleQuery = useGetRoleById(roleId);
  const role = roleQuery.data?.data?.data;
  const canUpdateRoles = !!role && role.action_list.is_can_update;
  const canDeleteRoles = !!role && role.action_list.is_can_delete;
  const deleteRoleMutation = useDeleteRoleById({
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/iam/roles");
      }
    },
    onSuccess: () => {
      router.push("/dashboard/master/iam/roles");
    },
  });
  const permissionsByModule = groupPermissionsByModule(role?.permissions);
  const sortedPermissionsByModule = Object.entries(
    permissionsByModule ?? {},
  ).sort(([aModule], [bModule]) => aModule.localeCompare(bModule));

  const renderValue = (value: string | undefined) => {
    if (roleQuery.isLoading) {
      return <Skeleton className="h-6 w-full" />;
    }

    return value || "-";
  };

  useEffect(() => {
    if (roleQuery.isError && roleQuery.error instanceof MainAPINotFoundError) {
      notFound();
    }
  }, [roleQuery.error, roleQuery.isError, router]);

  const breadcrumbItems = useMemo(
    () => [
      { name: t("breadcrumb"), link: "/dashboard/master/iam/roles" },
      { name: role?.name ?? t("breadcrumbDetail") },
    ],
    [role?.name, t],
  );

  const onDeleteHandler = () => {
    deleteRoleMutation.mutate(roleId);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="w-full flex justify-center">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb items={breadcrumbItems} />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href="/dashboard/master/iam/roles">
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">{t("title")}</h1>
          {role && (canUpdateRoles || canDeleteRoles) && (
            <div className="ms-auto flex gap-2">
              {canUpdateRoles && (
                <Button
                  render={
                    <Link href={`/dashboard/master/iam/roles/${roleId}/edit`} />
                  }
                  nativeButton={false}
                >
                  <Pencil /> {t("actions.edit")}
                </Button>
              )}
              {canDeleteRoles && (
                <Button
                  variant="destructive"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash /> {t("actions.delete")}
                </Button>
              )}
            </div>
          )}
        </div>

        <Card>
          <CardContent className="space-y-6">
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead className="w-1/3 border bg-secondary px-4 py-6">
                    {t("fields.key")}
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    {renderValue(role?.key)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    {t("fields.name")}
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    {renderValue(role?.name)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    {t("fields.description")}
                  </TableHead>
                  <TableCell className="border px-4 py-6 whitespace-normal break-words">
                    {renderValue(role?.description)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    {t("fields.showInPublic")}
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    <If condition={roleQuery.isLoading}>
                      <Then>
                        <Skeleton className="h-6 w-full" />
                      </Then>
                      <Else>
                        <If condition={!!role?.is_show_in_public}>
                          <Then>
                            <Badge>{t("enums.showInPublic.yes")}</Badge>
                          </Then>
                          <Else>
                            <Badge variant="secondary">
                              {t("enums.showInPublic.no")}
                            </Badge>
                          </Else>
                        </If>
                      </Else>
                    </If>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    {t("fields.createdAt")}
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    {roleQuery.isLoading ? (
                      <Skeleton className="h-6 w-full" />
                    ) : (
                      dayjs(role?.created_at)
                        .locale(locale)
                        .format("YYYY-MM-DD HH:mm:ss")
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    {t("fields.updatedAt")}
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    {roleQuery.isLoading ? (
                      <Skeleton className="h-6 w-full" />
                    ) : (
                      dayjs(role?.updated_at)
                        .locale(locale)
                        .format("YYYY-MM-DD HH:mm:ss")
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div>
              <h2 className="mb-3 font-heading text-lg">
                {t("permissions.title")}
              </h2>
              {roleQuery.isLoading && <Skeleton className="h-24 w-full" />}
              {!roleQuery.isLoading && !role?.permissions?.length && (
                <p>{t("permissions.empty")}</p>
              )}
              {!roleQuery.isLoading && (
                <div className="flex flex-col gap-2">
                  {sortedPermissionsByModule.map(([module, permissions]) => (
                    <RoleGroupedPermissionList
                      key={module}
                      module={module}
                      permissions={permissions}
                    />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("dialogs.deleteTitle")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("dialogs.deleteDescription")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("dialogs.cancel")}</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={deleteRoleMutation.isPending}
                onClick={onDeleteHandler}
              >
                {t("dialogs.deleteConfirm")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
