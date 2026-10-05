import { Swords } from "lucide-react";

// Placeholder until stories get a banner image (no API field yet).
// Swap this for the real image here once it exists.
export default function StoryCardBanner() {
  return (
    <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20">
      <Swords className="size-10 text-primary/40" />
    </div>
  );
}
