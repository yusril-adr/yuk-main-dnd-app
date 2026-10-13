import { AppTopBar } from "@/app/_components/app-topbar";

export default function AppTopbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex flex-col">
      <AppTopBar />
      {children}
    </div>
  );
}
