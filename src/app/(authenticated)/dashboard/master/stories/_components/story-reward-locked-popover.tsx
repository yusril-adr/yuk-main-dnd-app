import { CircleHelp } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/app/_components/ui/popover";

type TStoryRewardLockedPopoverProps = {
  // Field name, used in the trigger's aria-label
  label: string;
  description: string;
};

// (?) next to a locked reward label. Popover (not tooltip) so it opens on tap.
// Rendered outside the <label> so tapping it never focuses the input
export default function StoryRewardLockedPopover({
  label,
  description,
}: TStoryRewardLockedPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`About ${label}`}
            // -my-2 keeps the label row at text height so the reward inputs
            // stay aligned side by side
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
            Standardized reward
          </PopoverTitle>
          <PopoverDescription className="text-xs">
            {description}
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
