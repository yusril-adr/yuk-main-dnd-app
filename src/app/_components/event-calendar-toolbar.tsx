"use client";

import { CalendarController } from "@fullcalendar/react";
import {
  EventCalendarNextIcon,
  EventCalendarPrevIcon,
} from "@/app/_components/event-calendar-icons";
import { Button } from "@/app/_components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { cn } from "cn";

export interface EventCalendarToolbarProps {
  className?: string;
  controller: CalendarController;
  availableViews: readonly string[];
  addButton?: {
    isPrimary?: boolean;
    text?: string;
    hint?: string;
    click?: (ev: MouseEvent) => void;
  };
}

export function EventCalendarToolbar({
  className,
  controller,
  availableViews,
  addButton,
}: EventCalendarToolbarProps) {
  const buttons = controller.getButtonState();

  return (
    <div
      className={cn(
        "flex items-center justify-between flex-wrap gap-3",
        className,
      )}
    >
      <div className="order-1 flex shrink-0 items-center gap-2 sm:gap-3">
        {addButton && (
          <Button
            onClick={(event) => addButton.click?.(event.nativeEvent)}
            aria-label={addButton.hint}
          >
            {addButton.text}
          </Button>
        )}
        <Button
          onClick={() => controller.today()}
          aria-label={buttons.today.hint}
          variant="outline"
        >
          {buttons.today.text}
        </Button>
        <div className="flex items-center">
          <Button
            onClick={() => controller.prev()}
            disabled={buttons.prev.isDisabled}
            aria-label={buttons.prev.hint}
            variant="ghost"
            size="icon"
          >
            <EventCalendarPrevIcon />
          </Button>
          <Button
            onClick={() => controller.next()}
            disabled={buttons.next.isDisabled}
            aria-label={buttons.next.hint}
            variant="ghost"
            size="icon"
          >
            <EventCalendarNextIcon />
          </Button>
        </div>
      </div>
      <div className="order-3 basis-full text-lg sm:order-2 sm:min-w-0 sm:flex-1 sm:basis-auto sm:truncate sm:text-xl">
        {controller.view?.title}
      </div>
      {controller.view?.type ? (
        <Tabs
          className="order-2 sm:order-3"
          value={controller.view.type}
          onValueChange={(value) => {
            if (value && value !== controller.view?.type) {
              controller.changeView(value);
            }
          }}
        >
          <TabsList className="h-10! rounded-md border bg-card p-1">
            {availableViews.map((availableView) => (
              <TabsTrigger
                key={availableView}
                value={availableView}
                aria-label={buttons[availableView]?.hint}
                className="rounded-sm px-3 text-muted-foreground data-active:bg-primary data-active:text-primary-foreground data-active:shadow-none data-active:hover:text-primary-foreground sm:px-4"
              >
                {buttons[availableView]?.text}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      ) : null}
    </div>
  );
}
