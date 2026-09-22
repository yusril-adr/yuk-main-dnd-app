import type { Metadata } from "next";
import { Alegreya_Sans, DM_Mono, Eczar } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";
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
  title: "YukMainDnD",
  description: "YukMainDnD App",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
