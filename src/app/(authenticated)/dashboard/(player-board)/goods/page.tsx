import type { Metadata } from "next";

import GoodsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Goods",
};

export default function GoodsPage() {
  return <GoodsPageClient />;
}
