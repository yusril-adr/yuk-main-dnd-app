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
import { STORY_XP_GUIDE_ROWS } from "@/app/(authenticated)/dashboard/master/stories/_constants/story-xp-guide";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_STORIES_CREATE_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/create/_messages";

const ROW_LABEL_KEY = {
  easy: "xpGuide.easy",
  medium: "xpGuide.medium",
  hard: "xpGuide.hard",
} as const;

// (?) next to the EXP Awarded label. Popover (not tooltip) so it opens on tap.
// Rendered outside the <label> so tapping it never focuses the EXP input
export default function StoryCreateXpGuidePopover() {
  const { t } = useT(MASTER_STORIES_CREATE_MESSAGES);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t("xpGuide.aria")}
            // -my-2 keeps the label row at text height so the EXP and Gold
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
            {t("xpGuide.title")}
          </PopoverTitle>
          <PopoverDescription className="text-xs">
            {t("xpGuide.note")}
          </PopoverDescription>
        </PopoverHeader>
        <ItemGroup className="gap-1.5">
          {STORY_XP_GUIDE_ROWS.map(({ key, xp }) => (
            <Item key={key} variant="outline" size="xs" role="listitem">
              <ItemContent>
                <ItemTitle>{t(ROW_LABEL_KEY[key])}</ItemTitle>
              </ItemContent>
              <ItemActions className="font-heading text-primary tabular-nums">
                {t("xpGuide.xpValue", { count: xp })}
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </PopoverContent>
    </Popover>
  );
}
