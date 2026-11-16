import type { Metadata } from "next";

import BoardEventDetailPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Event",
};

export default function BoardEventDetailPage() {
  return <BoardEventDetailPageClient />;
}
