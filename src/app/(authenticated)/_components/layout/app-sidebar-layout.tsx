import { AppSidebar } from "@/app/(authenticated)/_components/app-sidebar";
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
        <SidebarTrigger className="sticky top-0" size="icon-lg" />

        {children}
      </SidebarInset>
    </>
  );
}
