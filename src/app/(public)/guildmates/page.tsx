import type { Metadata } from "next";

import GuildMatesPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Guildmates",
};

export default function GuildMatesPage() {
  return <GuildMatesPageClient />;
}
