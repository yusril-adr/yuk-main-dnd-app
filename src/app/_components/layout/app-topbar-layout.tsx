import { AppTopBar } from "@/app/_components/app-topbar";
import AccessToken from "@/libs/cookies/access-token";

export default async function AppTopbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasAccessToken = !!AccessToken.get();

  return (
    <div className="w-full flex flex-col">
      <AppTopBar hasAccessToken={hasAccessToken} />
      {children}
    </div>
  );
}
