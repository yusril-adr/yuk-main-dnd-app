"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { PermissionEnum } from "@/common/enums/permission";

import GoodsComingSoon from "./_components/goods-coming-soon";

export default function GoodsPageClient() {
  const router = useRouter();
  const { auth } = useAuthContext();
  const canView = !!auth?.permissions.includes(PermissionEnum.GOODS_VIEW);

  // Same gate as the sidebar item
  useEffect(() => {
    if (auth && !canView) router.replace("/dashboard");
  }, [auth, canView, router]);

  return (
    <div className="flex w-full min-w-0 justify-center">
      <main className="flex w-full max-w-7xl flex-col px-4 pb-10 sm:px-6 lg:px-10">
        <AppBreadcrumb items={[{ name: "Goods" }]} />

        <div className="mt-4 mb-6 flex items-center">
          <h1 className="font-heading text-2xl">Goods</h1>
        </div>

        {canView && <GoodsComingSoon />}
      </main>
    </div>
  );
}
