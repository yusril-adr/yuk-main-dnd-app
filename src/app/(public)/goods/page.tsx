import type { Metadata } from "next";

import { makePageMetadata } from "@/utils/seo-helper";

import GoodsPageClient from "./page-client";

export const metadata: Metadata = makePageMetadata({
  title: "Goods",
  description:
    "Dice, maps and guild merchandise from the YukMainDnD market. Coming soon.",
  path: "/goods",
});

export default function GoodsPage() {
  return <GoodsPageClient />;
}
