"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { useAuthContext } from "@/app/_hooks/use-auth-context";

export default function DashboardPageClient() {
  const { auth } = useAuthContext();

  const breadcrumbItems = [
    {
      name: "Dashboard",
    },
  ];

  return (
    <div className="w-full flex justify-center min-w-0 h-full">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10 gap-2">
        <div className="mb-2">
          <AppBreadcrumb items={breadcrumbItems} />
        </div>
        <h1 className="font-heading text-2xl">Dashboard</h1>

        <div className="w-full my-auto flex justify-center items-center">
          <div className="flex flex-col items-center max-w-lg">
            <DotLottieReact src={"/lotties/wumpus-hi.json"} autoplay loop />
            <h2 className="font-heading text-xl">
              Welcome, {auth?.display_name ?? "-"}
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}
