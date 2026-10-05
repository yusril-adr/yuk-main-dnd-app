import { Separator } from "@/app/_components/ui/separator";

// Ornamental divider: line ◆ line
export default function StoryDetailOrnament() {
  return (
    <div
      aria-hidden
      className="flex items-center gap-3 text-primary/40 select-none"
    >
      <Separator className="flex-1 bg-primary/20" />
      <span className="text-xs">&#9830;</span>
      <Separator className="flex-1 bg-primary/20" />
    </div>
  );
}
