import { AppSidebar } from "@/app/(authenticated)/dashboard/_components/app-sidebar";
import { SidebarInset, SidebarTrigger } from "@/app/_components/ui/sidebar";

export default function AppSidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className="sticky top-0" />

        {children}
      </SidebarInset>
    </>
  );
}
