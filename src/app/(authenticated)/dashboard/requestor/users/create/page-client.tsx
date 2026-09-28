"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import UserCreateForm from "@/app/(authenticated)/dashboard/requestor/users/create/_components/user-create-form";
import { useCreateUser } from "@/app/(authenticated)/dashboard/requestor/users/_hooks/use-create-user";
import CONFIG from "@/common/constants/config";

export default function UserCreatePageClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: createUserMutate,
    error: createUserError,
    isPending: createUserIsPending,
    isPaused: createUserIsPaused,
  } = useCreateUser({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.REQUESTOR_API.USER.ALL()],
      });
      router.push("/dashboard/requestor/users");
    },
  });

  const breadcrumbItems = [
    {
      name: "Users",
      link: "/dashboard/requestor/users",
    },
    {
      name: "Create",
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb items={breadcrumbItems} />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href={"/dashboard/requestor/users"}>
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">Create User</h1>
        </div>

        <UserCreateForm
          onSubmitPayload={createUserMutate}
          mutationError={createUserError}
          isPending={createUserIsPending}
          isPaused={createUserIsPaused}
        />
      </main>
    </div>
  );
}
