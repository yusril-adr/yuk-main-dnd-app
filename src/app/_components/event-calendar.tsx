"use client";

import {
  type CalendarOptions,
  useCalendarController,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import listPlugin from "@fullcalendar/react/list";
import multiMonthPlugin from "@fullcalendar/react/multimonth";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import { EventCalendarToolbar } from "@/app/_components/event-calendar-toolbar";
import { EventCalendarViews } from "@/app/_components/ui/event-calendar-views";
import { EventCalendarCloseIcon } from "@/app/_components/event-calendar-icons";
import { cn } from "cn";

const plugins = [
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
  multiMonthPlugin,
];
const emptyPlugins: typeof plugins = [];
const defaultAvailableViews = [
  "dayGridMonth",
  "timeGridWeek",
  "timeGridDay",
  "listWeek",
  "multiMonthYear",
];
const navLinkDayClick = "timeGridDay";
const navLinkWeekClick = "timeGridWeek";

export interface EventCalendarProps
  extends Omit<
    CalendarOptions,
    "class" | "className" | "headerToolbar" | "footerToolbar"
  > {
  className?: string;
  availableViews?: readonly string[];
  addButton?: {
    isPrimary?: boolean;
    text?: string;
    hint?: string;
    click?: (ev: MouseEvent) => void;
  };
}

export function EventCalendar({
  availableViews = defaultAvailableViews,
  addButton,
  className,
  height,
  contentHeight,
  direction,
  plugins: userPlugins = emptyPlugins,
  ...restOptions
}: EventCalendarProps) {
  const controller = useCalendarController();

  const hasBorderX = !(restOptions.borderlessX ?? restOptions.borderless);
  const hasBorderTop = !(restOptions.borderlessTop ?? restOptions.borderless);
  const hasBorderBottom = !(
    restOptions.borderlessBottom ?? restOptions.borderless
  );
  const isHeightAuto = height === "auto" || contentHeight === "auto";

  return (
    <div
      className={cn(
        className,
        "flex flex-col bg-background",
        hasBorderX && "border-x",
        hasBorderTop && "border-t",
        hasBorderBottom && "border-b",
        hasBorderTop && hasBorderX && "rounded-t-lg",
        hasBorderBottom && hasBorderX && "rounded-b-lg",
        !isHeightAuto && "overflow-hidden",
      )}
      style={{ height }}
      dir={direction === "rtl" ? "rtl" : undefined}
    >
      <EventCalendarToolbar
        className="p-3 sm:p-4"
        controller={controller}
        availableViews={availableViews}
        addButton={addButton}
      />
      <div className="grow min-h-0">
        <EventCalendarViews
          controller={controller}
          height={
            isHeightAuto
              ? "auto"
              : height !== undefined
                ? "100%"
                : contentHeight
          }
          initialView={availableViews[0]}
          navLinkDayClick={navLinkDayClick}
          navLinkWeekClick={navLinkWeekClick}
          plugins={userPlugins.length ? [...plugins, ...userPlugins] : plugins}
          popoverCloseContent={<EventCalendarCloseIcon />}
          {...restOptions}
        />
      </div>
    </div>
  );
}
