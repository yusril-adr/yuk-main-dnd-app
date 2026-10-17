import AppTopbarLayout from "@/app/_components/layout/app-topbar-layout";

import PublicFooter from "@/app/(public)/_components/public-footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppTopbarLayout>
      {/* Fills the viewport below the top bar (4rem + 1px border) so the footer sits at the bottom */}
      <div className="flex min-h-[calc(100svh-4rem-1px)] w-full min-w-0 flex-col">
        <div className="flex w-full min-w-0 flex-1 flex-col">{children}</div>
        <PublicFooter />
      </div>
    </AppTopbarLayout>
  );
}
