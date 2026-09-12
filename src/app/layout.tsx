import type { Metadata } from "next";
import { Red_Hat_Display, Eczar, Lato } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";
import { Providers } from "./providers";

const eczarHeading = Eczar({
  subsets: ["latin"],
  variable: "--font-heading",
});

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

const readHeadDisplayMono = Red_Hat_Display({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YukMainDND",
  description: "YukMainDND App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        readHeadDisplayMono.variable,
        lato.variable,
        eczarHeading.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
