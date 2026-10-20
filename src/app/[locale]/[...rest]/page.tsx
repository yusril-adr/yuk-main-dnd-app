import { notFound } from "next/navigation";

// Unknown paths render [locale]/not-found inside the localized layout
export default function CatchAllPage() {
  notFound();
}
