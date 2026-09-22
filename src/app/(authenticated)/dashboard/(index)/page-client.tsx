"use client";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";

export default function DashboardPageClient() {
  const breadcrumbItems = [
    {
      name: "Dashboard",
    },
  ];

  return (
    <div className="w-full flex justify-center min-w-0">
      <div className="w-full max-w-7xl flex flex-col px-10 pb-10 gap-2">
        <div className="mb-2">
          <AppBreadcrumb items={breadcrumbItems} />
        </div>

        <h1 className="font-heading text-2xl">Dashboard</h1>
      </div>
    </div>
  );
}
