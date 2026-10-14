import type { Metadata } from "next";

import HomePageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD",
};

export default function Home() {
  return <HomePageClient />;
}
