import type { Metadata } from "next";

import { SITE_URL } from "@/utils/seo-helper";

// Resolves the root /opengraph-image for pages outside [locale] (root 404)
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

// The real root (<html>, providers) is app/[locale]/layout.tsx so every page
// gets the locale as a static param. This pass-through only exists for the
// root not-found page and the metadata routes outside [locale].
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
