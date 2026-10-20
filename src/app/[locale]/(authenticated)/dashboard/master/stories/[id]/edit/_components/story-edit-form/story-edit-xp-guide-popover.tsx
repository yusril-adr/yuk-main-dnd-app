import { CircleHelp } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@/app/_components/ui/item";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { STORY_XP_GUIDE } from "@/app/[locale]/(authenticated)/dashboard/master/stories/_constants/story-xp-guide";

// (?) next to the XP Awarded label. Popover (not tooltip) so it opens on tap.
// Rendered outside the <label> so tapping it never focuses the XP input
export default function StoryEditXpGuidePopover() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="XP guide"
            // -my-2 keeps the label row at text height so the XP and Gold
            // inputs stay aligned side by side
            className="-my-2 size-8 text-muted-foreground hover:text-foreground"
          />
        }
      >
        <CircleHelp aria-hidden />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-64 max-w-[calc(100vw-2rem)] gap-3 p-3"
      >
        <PopoverHeader>
          <PopoverTitle className="font-heading">
            {STORY_XP_GUIDE.title}
          </PopoverTitle>
          <PopoverDescription className="text-xs">
            {STORY_XP_GUIDE.note}
          </PopoverDescription>
        </PopoverHeader>
        <ItemGroup className="gap-1.5">
          {STORY_XP_GUIDE.rows.map(({ label, xp }) => (
            <Item
              key={label}
              variant="outline"
              size="xs"
              role="listitem"
            >
              <ItemContent>
                <ItemTitle>{label}</ItemTitle>
              </ItemContent>
              <ItemActions className="font-heading text-primary tabular-nums">
                {xp} XP
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </PopoverContent>
    </Popover>
  );
}
