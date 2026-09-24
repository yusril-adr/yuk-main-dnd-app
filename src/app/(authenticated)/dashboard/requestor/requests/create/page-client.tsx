"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import RequestCreateForm from "@/app/(authenticated)/dashboard/requestor/requests/create/_components/request-create-form";
import { useCreateRequest } from "@/app/(authenticated)/dashboard/requestor/requests/_hooks/use-create-request";
import CONFIG from "@/common/constants/config";

export default function RequestCreatePageClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: createRequestMutate,
    error: createRequestError,
    isPending: createRequestIsPending,
    isPaused: createRequestIsPaused,
  } = useCreateRequest({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.REQUESTOR_API.REQUEST.ALL()],
      });
      router.push("/dashboard/requestor/requests");
    },
  });

  const breadcrumbItems = [
    {
      name: "Requests",
      link: "/dashboard/requestor/requests",
    },
    {
      name: "Create",
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb items={breadcrumbItems} />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href={"/dashboard/requestor/requests"}>
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">Create Request</h1>
        </div>

        <RequestCreateForm
          onSubmitPayload={createRequestMutate}
          mutationError={createRequestError}
          isPending={createRequestIsPending}
          isPaused={createRequestIsPaused}
        />
      </div>
    </div>
  );
}
