"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import UserEditForm from "@/app/(authenticated)/dashboard/users/[id]/edit/_components/user-edit-form";
import { useGetUserById } from "@/app/(authenticated)/dashboard/users/_hooks/use-get-user-by-id";
import { useUpdateUserById } from "@/app/(authenticated)/dashboard/users/_hooks/use-update-user-by-id";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";

export default function UserEditPageClient() {
  const params = useParams();
  const router = useRouter();
  const getDataQuery = useGetUserById(params.id as string);
  const {
    mutate: updateUserMutate,
    error: updateUserError,
    isPending: updateUserIsPending,
    isPaused: updateUserIsPaused,
  } = useUpdateUserById({
    onSuccess: () => {
      router.push("/users");
    },
    onError: (error) => {
      if (error instanceof MainAPINotFoundError) {
        router.push("/users");
      }
    },
  });

  useEffect(() => {
    if (
      getDataQuery.isError &&
      getDataQuery.error &&
      getDataQuery.error instanceof MainAPINotFoundError
    ) {
      router.push("/users");
    }
  }, [getDataQuery.error, getDataQuery.isError, router]);

  const breadcrumbItems = [
    {
      name: "Users",
      link: "/users",
    },
    ...(!getDataQuery.isLoading
      ? [
          {
            name: getDataQuery.data?.data?.data?.name ?? "Detail",
            link: `/users/${params.id}`,
          },
        ]
      : []),
    {
      name: "Edit",
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb items={breadcrumbItems} />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href={"/users"}>
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">Edit User</h1>
        </div>

        <UserEditForm
          name={getDataQuery.data?.data?.data?.name}
          email={getDataQuery.data?.data?.data?.email}
          role={getDataQuery.data?.data?.data?.role}
          status={getDataQuery.data?.data?.data?.status}
          isLoading={getDataQuery.isLoading}
          onSubmitPayload={(payload) =>
            updateUserMutate({ id: params.id as string, payload })
          }
          mutationError={updateUserError}
          isPending={updateUserIsPending}
          isPaused={updateUserIsPaused}
        />
      </div>
    </div>
  );
}
