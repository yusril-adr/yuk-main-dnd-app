import { cookies } from "next/headers";

import CONFIG from "@/common/constants/config";
import { AppTopBar } from "@/app/_components/app-topbar";

export default async function AppTopbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const hasAccessToken = Boolean(
    cookieStore.get(CONFIG.COOKIE.ACCESS_TOKEN_KEY)?.value,
  );

  return (
    <div className="w-full flex flex-col">
      <AppTopBar hasAccessToken={hasAccessToken}></AppTopBar>
      {children}
    </div>
  );
}
