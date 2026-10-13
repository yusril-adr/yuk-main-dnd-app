import { cookies } from "next/headers";

import { AppTopBar } from "@/app/_components/app-topbar";
import CONFIG from "@/common/constants/config";

export default async function AppTopbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Server component: read the request cookie (document.cookie is unavailable
  // here), so server and client agree and the top bar hydrates cleanly.
  const cookieStore = await cookies();
  const hasAccessToken = !!cookieStore.get(CONFIG.COOKIE.ACCESS_TOKEN_KEY)
    ?.value;

  return (
    <div className="w-full flex flex-col">
      <AppTopBar hasAccessToken={hasAccessToken} />
      {children}
    </div>
  );
}
