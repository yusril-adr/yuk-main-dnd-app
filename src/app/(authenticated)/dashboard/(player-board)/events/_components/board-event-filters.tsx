"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";
import { useT } from "@/app/_hooks/use-t";

import {
  BOARD_EVENT_FILTER_ALL,
  BOARD_EVENT_MEMBER_STATUS_OPTIONS,
  BOARD_EVENT_STATUS_OPTIONS,
} from "@/app/(authenticated)/dashboard/(player-board)/events/_constants/board-event";
import { BOARD_EVENTS_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/events/_messages";
import type { TBoardEventFiltersProps } from "@/app/(authenticated)/dashboard/(player-board)/events/_types/board-event-components-props";

const STATUS_KEY = {
  [EventStatusEnum.DRAFT]: "enums.status.draft",
  [EventStatusEnum.PUBLISHED]: "enums.status.published",
  [EventStatusEnum.ARCHIVED]: "enums.status.archived",
  [EventStatusEnum.CANCELLED]: "enums.status.cancelled",
  [EventStatusEnum.COMPLETED]: "enums.status.completed",
} as const;

const MEMBER_STATUS_KEY = {
  [EventMemberStatusEnum.REGISTERED]: "enums.memberStatus.registered",
  [EventMemberStatusEnum.ABSENT]: "enums.memberStatus.absent",
  [EventMemberStatusEnum.ATTENDED]: "enums.memberStatus.attended",
} as const;

function toNumberOrNull<T extends number>(value: string | null) {
  return !value || value === BOARD_EVENT_FILTER_ALL
    ? null
    : (Number(value) as T);
}

export default function BoardEventFilters({
  search,
  status,
  memberStatus,
  onSearchChange,
  onFilterChange,
}: TBoardEventFiltersProps) {
  const { t } = useT(BOARD_EVENTS_MESSAGES);
  // Controlled from the first render so Base UI never sees it switch modes
  const [searchValue, setSearchValue] = useState(search ?? "");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const statusItems = useMemo(
    () => [
      { label: t("filters.allStatuses"), value: BOARD_EVENT_FILTER_ALL },
      ...BOARD_EVENT_STATUS_OPTIONS.map((item) => ({
        label: t(STATUS_KEY[item]),
        value: String(item),
      })),
    ],
    [t],
  );

  const memberStatusItems = useMemo(
    () => [
      { label: t("filters.anySeat"), value: BOARD_EVENT_FILTER_ALL },
      ...BOARD_EVENT_MEMBER_STATUS_OPTIONS.map((item) => ({
        label: t(MEMBER_STATUS_KEY[item]),
        value: String(item),
      })),
    ],
    [t],
  );

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  // Debounced; ignores 1-2 characters like the other event searches
  const handleSearchChange = useCallback(
    (value: string) => {
      if (value && value.length < 3) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => onSearchChange(value), 300);
    },
    [onSearchChange],
  );

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <InputGroup className="h-10 bg-card md:flex-1">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          aria-label={t("filters.searchAria")}
          placeholder={t("filters.searchPlaceholder")}
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
            handleSearchChange(event.target.value);
          }}
        />
      </InputGroup>

      <div className="grid grid-cols-2 gap-2 md:flex">
        <Select
          items={statusItems}
          value={status != null ? String(status) : BOARD_EVENT_FILTER_ALL}
          onValueChange={(value) =>
            onFilterChange({
              status: toNumberOrNull<EventStatusEnum>(value),
              memberStatus,
            })
          }
        >
          <SelectTrigger
            aria-label={t("filters.statusAria")}
            className="h-10! w-full bg-card md:w-44"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {statusItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          items={memberStatusItems}
          value={
            memberStatus != null ? String(memberStatus) : BOARD_EVENT_FILTER_ALL
          }
          onValueChange={(value) =>
            onFilterChange({
              status,
              memberStatus: toNumberOrNull<EventMemberStatusEnum>(value),
            })
          }
        >
          <SelectTrigger
            aria-label={t("filters.memberStatusAria")}
            className="h-10! w-full bg-card md:w-44"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {memberStatusItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
