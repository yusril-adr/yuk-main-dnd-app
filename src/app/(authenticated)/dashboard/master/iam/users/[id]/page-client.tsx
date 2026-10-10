"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, notFound } from "next/navigation";
import { ArrowLeft, Dot, Pencil, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Else, If, Then } from "react-if";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Separator } from "@/app/_components/ui/separator";
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
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import dayjs from "@/libs/dayjs";

import { useGetUserById } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-get-user-by-id";
import { useDeleteUserById } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-delete-user-by-id";

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-baseline gap-4 py-2">
      <span className="text-muted-foreground text-sm shrink-0">{label}</span>
      <span className="text-sm font-medium text-right">{value}</span>
    </div>
  );
}

function StatBlock({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-muted-foreground tracking-wider uppercase">
        {label}
      </span>
      <span className="text-lg font-heading font-medium">{value}</span>
    </div>
  );
}

export default function UserDetailPageClient() {
  const { auth } = useAuthContext();
  const { id } = useParams();
  const router = useRouter();
  const userId = id as string;
  const queryClient = useQueryClient();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const userQuery = useGetUserById(userId);
  const user = userQuery.data?.data?.data;

  const canUpdateUsers = auth?.permissions.includes(
    PermissionEnum.USERS_UPDATE,
  );
  const canDeleteUsers = auth?.permissions.includes(
    PermissionEnum.USERS_DELETE,
  );

  const deleteUserMutation = useDeleteUserById({
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/iam/users");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.USER.ALL()],
      });
      router.push("/dashboard/master/iam/users");
    },
  });

  const renderValue = (value: string | number | undefined) => {
    if (userQuery.isLoading) {
      return <Skeleton className="h-6 w-full" />;
    }

    return value ?? "-";
  };

  useEffect(() => {
    if (userQuery.isError && userQuery.error instanceof MainAPINotFoundError) {
      notFound();
    }
  }, [userQuery.error, userQuery.isError, router]);

  const breadcrumbItems = useMemo(
    () => [
      { name: "Users", link: "/dashboard/master/iam/users" },
      { name: user?.display_name ?? "Detail" },
    ],
    [user?.display_name],
  );

  const onDeleteHandler = () => {
    deleteUserMutation.mutate(userId);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="w-full flex justify-center">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb items={breadcrumbItems} />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href="/dashboard/master/iam/users">
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">User Detail</h1>
          {user && (canUpdateUsers || canDeleteUsers) && (
            <div className="ms-auto flex gap-2">
              <If condition={!!canUpdateUsers}>
                <Then>
                  <Button
                    variant="outline"
                    render={
                      <Link
                        href={`/dashboard/master/iam/users/${userId}/edit`}
                      />
                    }
                    nativeButton={false}
                  >
                    <Pencil /> Edit
                  </Button>
                </Then>
              </If>
              <If condition={!!canDeleteUsers}>
                <Then>
                  <Button
                    variant="destructive"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash /> Delete
                  </Button>
                </Then>
              </If>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-lg border-2 border-primary/15 bg-card">
            <CardContent className="flex flex-col items-center gap-6">
              {/* Guild stamp ornament */}
              <div className="text-muted-foreground/40 text-xs tracking-[0.3em] uppercase select-none">
                &#9830; Guild Record &#9830;
              </div>

              {/* Avatar */}
              <If condition={userQuery.isLoading}>
                <Then>
                  <Skeleton className="h-28 w-28 rounded-full" />
                </Then>
                <Else>
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-primary/5 scale-110" />
                    <Avatar className="h-28 w-28 ring-2 ring-primary/20 ring-offset-2 ring-offset-card">
                      <AvatarImage
                        src={
                          user?.avatar_url ??
                          makeDefaultAvatarUrl(user?.display_name)
                        }
                        alt={user?.display_name}
                      />
                      <AvatarFallback className="text-2xl font-heading">
                        {getInitials(user?.display_name ?? "")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </Else>
              </If>

              {/* Name & username */}
              <div className="text-center">
                <If condition={userQuery.isLoading}>
                  <Then>
                    <Skeleton className="h-7 w-48 mx-auto mb-2" />
                    <Skeleton className="h-4 w-28 mx-auto" />
                  </Then>
                  <Else>
                    <h2 className="font-heading text-xl font-medium">
                      {user?.display_name}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      <If condition={!!user?.username}>
                        <Then>@{user?.username}</Then>
                        <Else>(username not set)</Else>
                      </If>
                    </p>
                  </Else>
                </If>
              </div>

              {/* Roles */}
              <If
                condition={
                  !userQuery.isLoading && !!user?.roles && user.roles.length > 0
                }
              >
                <Then>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {user?.roles?.map((role) => (
                      <Badge key={role.id} variant="secondary">
                        {role.name}
                      </Badge>
                    ))}
                  </div>
                </Then>
              </If>

              <Separator />

              {/* Stats row */}
              <If condition={userQuery.isLoading}>
                <Then>
                  <div className="grid grid-cols-3 gap-6 w-full">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-6 w-10" />
                      </div>
                    ))}
                  </div>
                </Then>
                <Else>
                  <div className="grid grid-cols-3 gap-6 w-full">
                    <StatBlock
                      label="Player"
                      value={`Lv.${user?.player_level}`}
                    />
                    <StatBlock label="DM" value={`Lv.${user?.dm_level}`} />
                    <StatBlock
                      label="Gold"
                      value={user?.points?.toLocaleString()}
                    />
                  </div>
                </Else>
              </If>

              <Separator />

              {/* Detail fields */}
              <div className="w-full">
                <If condition={userQuery.isLoading}>
                  <Then>
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex justify-between">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-36" />
                        </div>
                      ))}
                    </div>
                  </Then>
                  <Else>
                    <DetailRow label="Email" value={renderValue(user?.email)} />
                    <DetailRow
                      label="Bio"
                      value={
                        <If condition={!!user?.bio}>
                          <Then>{user?.bio}</Then>
                          <Else>
                            <span className="text-muted-foreground italic">
                              No bio provided
                            </span>
                          </Else>
                        </If>
                      }
                    />
                    <DetailRow
                      label="Player EXP"
                      value={renderValue(user?.player_exp)}
                    />
                    <DetailRow
                      label="DM EXP"
                      value={renderValue(user?.dm_exp)}
                    />
                    <Separator className="my-2" />
                    <DetailRow
                      label="Enrolled"
                      value={
                        userQuery.isLoading ? (
                          <Skeleton className="h-6 w-full" />
                        ) : (
                          dayjs(user?.created_at).format("YYYY-MM-DD HH:mm:ss")
                        )
                      }
                    />
                    <DetailRow
                      label="Last Updated"
                      value={
                        userQuery.isLoading ? (
                          <Skeleton className="h-6 w-full" />
                        ) : (
                          dayjs(user?.updated_at).format("YYYY-MM-DD HH:mm:ss")
                        )
                      }
                    />
                  </Else>
                </If>
              </div>

              {/* Bottom ornament */}
              <div className="flex items-center text-muted-foreground/30 text-xs tracking-[0.3em] select-none">
                <Dot />
                <Dot />
                <Dot />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={deleteUserMutation.isPending}
              onClick={onDeleteHandler}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
