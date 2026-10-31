import type { Metadata } from "next";
import { Alegreya_Sans, DM_Mono, Eczar } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { cn } from "cn";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/utils/seo-helper";
import CONFIG from "@/common/constants/config";
import { parseLocale } from "@/libs/i18n/locale-cookie";
import { Providers } from "./providers";

const eczarHeading = Eczar({
  subsets: ["latin"],
  variable: "--font-heading",
});

const alegreyaSans = Alegreya_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

const dmMono = DM_Mono({
  weight: "400",
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Yonaka", url: "https://yusril-adr.github.io" }],
  creator: "Yonaka",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLocale = parseLocale(
    cookieStore.get(CONFIG.COOKIE.LOCALE_KEY)?.value,
  );

  return (
    <html
      lang={initialLocale}
      className={cn(
        "h-full",
        "antialiased",
        dmMono.variable,
        alegreyaSans.variable,
        eczarHeading.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers initialLocale={initialLocale}>{children}</Providers>
      </body>
    </html>
  );
}
