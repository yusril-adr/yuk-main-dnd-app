"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/_components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/app/_components/ui/table";
import { Skeleton } from "@/app/_components/ui/skeleton";
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
import { PermissionEnum } from "@/common/enums/permission";
import CONFIG from "@/common/constants/config";
import { getInitials } from "@/utils/user-helper";

import { useGetUserById } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-get-user-by-id";
import { useDeleteUserById } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-delete-user-by-id";

export default function UserDetailPageClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { auth } = useAuthContext();
  const queryClient = useQueryClient();

  const canUpdateUsers = auth?.permissions.includes(
    PermissionEnum.USERS_UPDATE,
  );
  const canDeleteUsers = auth?.permissions.includes(
    PermissionEnum.USERS_DELETE,
  );

  const { data, isLoading, isError } = useGetUserById(id);
  const user = data?.data?.data;

  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutate: deleteUserMutate, isPending: isDeleting } =
    useDeleteUserById({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.USER.ALL()],
        });
        router.push("/dashboard/master/iam/users");
      },
    });

  useEffect(() => {
    if (isError) {
      router.replace("/dashboard/master/iam/users");
    }
  }, [isError, router]);

  const onDeleteConfirm = useCallback(() => {
    deleteUserMutate(id);
  }, [deleteUserMutate, id]);

  return (
    <div className="w-full flex justify-center">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb
          items={[
            { name: "Users", link: "/dashboard/master/iam/users" },
            { name: isLoading ? "..." : user?.display_name ?? "Detail" },
          ]}
        />

        <div className="flex items-center justify-between mt-4 mb-6">
          <div className="flex items-center gap-x-2">
            <Link href="/dashboard/master/iam/users">
              <ArrowLeft />
            </Link>
            <h1 className="font-heading text-2xl">
              {isLoading ? <Skeleton className="h-8 w-48" /> : user?.display_name}
            </h1>
          </div>

          {!isLoading && user && (
            <div className="flex items-center gap-2">
              {canUpdateUsers && (
                <Button
                  variant="outline"
                  render={
                    <Link
                      href={`/dashboard/master/iam/users/${user.id}/edit`}
                    />
                  }
                  nativeButton={false}
                >
                  <Pencil /> Edit
                </Button>
              )}
              {canDeleteUsers && (
                <Button
                  variant="destructive"
                  onClick={() => setConfirmDelete(true)}
                >
                  <Trash /> Delete
                </Button>
              )}
            </div>
          )}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              {isLoading ? (
                <Skeleton className="h-16 w-16 rounded-full" />
              ) : (
                <Avatar size="lg">
                  <AvatarImage
                    src={user?.avatar_url}
                    alt={user?.display_name}
                  />
                  <AvatarFallback>
                    {getInitials(user?.display_name ?? "")}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                {isLoading ? (
                  <>
                    <Skeleton className="h-6 w-40 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </>
                ) : (
                  <>
                    <p className="text-lg font-medium">{user?.display_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.username ? `@${user.username}` : "(username not set)"}
                    </p>
                  </>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableHead className="w-48">
                        <Skeleton className="h-4 w-28" />
                      </TableHead>
                      <TableCell>
                        <Skeleton className="h-4 w-48" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableCell>{user?.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableCell>{user?.username ?? "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Bio</TableHead>
                      <TableCell>{user?.bio ?? "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Player Level</TableHead>
                      <TableCell>Lv.{user?.player_level}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Player EXP</TableHead>
                      <TableCell>{user?.player_exp}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>DM Level</TableHead>
                      <TableCell>Lv.{user?.dm_level}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>DM EXP</TableHead>
                      <TableCell>{user?.dm_exp}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Gold Pieces</TableHead>
                      <TableCell>{user?.points}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Roles</TableHead>
                      <TableCell>
                        {user?.roles && user.roles.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {user.roles.map((role) => (
                              <Badge key={role.id} variant="secondary">
                                {role.name}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Created At</TableHead>
                      <TableCell>
                        {user?.created_at
                          ? new Date(user.created_at).toLocaleString()
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Updated At</TableHead>
                      <TableCell>
                        {user?.updated_at
                          ? new Date(user.updated_at).toLocaleString()
                          : "-"}
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <AlertDialog
        open={confirmDelete}
        onOpenChange={(open) => {
          if (!open) setConfirmDelete(false);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete user?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The user will be permanently removed
              from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={onDeleteConfirm}
              disabled={isDeleting}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}