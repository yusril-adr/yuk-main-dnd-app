import { useCallback, useEffect, useRef, useState } from "react";
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
import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { STORY_STATUS_LABEL } from "@/api/main/modules/master/stories/enums/story-status-label";
import type { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";
import { STORY_MEMBER_STATUS_LABEL } from "@/api/main/modules/master/stories/enums/story-member-status-label";

import {
  BOARD_STORY_FILTER_ALL,
  BOARD_STORY_MEMBER_STATUS_OPTIONS,
  BOARD_STORY_STATUS_OPTIONS,
} from "@/app/(authenticated)/dashboard/(player-board)/stories/_constants/board-story";
import type { TBoardStoryFiltersProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

const STATUS_ITEMS = [
  { label: "All statuses", value: BOARD_STORY_FILTER_ALL },
  ...BOARD_STORY_STATUS_OPTIONS.map((status) => ({
    label: STORY_STATUS_LABEL[status],
    value: String(status),
  })),
];

const MEMBER_STATUS_ITEMS = [
  { label: "Any seat", value: BOARD_STORY_FILTER_ALL },
  ...BOARD_STORY_MEMBER_STATUS_OPTIONS.map((status) => ({
    label: STORY_MEMBER_STATUS_LABEL[status],
    value: String(status),
  })),
];

function toNumberOrNull<T extends number>(value: string | null) {
  return !value || value === BOARD_STORY_FILTER_ALL
    ? null
    : (Number(value) as T);
}

export default function BoardStoryFilters({
  search,
  status,
  memberStatus,
  onSearchChange,
  onFilterChange,
}: TBoardStoryFiltersProps) {
  // Controlled from the first render so Base UI never sees it switch modes
  const [searchValue, setSearchValue] = useState(search ?? "");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  // Debounced; ignores 1-2 characters like the other story searches
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
          aria-label="Search my stories"
          placeholder="Search by title (min. 3 characters)…"
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
            handleSearchChange(event.target.value);
          }}
        />
      </InputGroup>

      <div className="grid grid-cols-2 gap-2 md:flex">
        <Select
          items={STATUS_ITEMS}
          value={status != null ? String(status) : BOARD_STORY_FILTER_ALL}
          onValueChange={(value) =>
            onFilterChange({
              status: toNumberOrNull<StoryStatusEnum>(value),
              memberStatus,
            })
          }
        >
          <SelectTrigger
            aria-label="Story status"
            className="h-10! w-full bg-card md:w-44"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {STATUS_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          items={MEMBER_STATUS_ITEMS}
          value={
            memberStatus != null ? String(memberStatus) : BOARD_STORY_FILTER_ALL
          }
          onValueChange={(value) =>
            onFilterChange({
              status,
              memberStatus: toNumberOrNull<StoryMemberStatusEnum>(value),
            })
          }
        >
          <SelectTrigger
            aria-label="My member status"
            className="h-10! w-full bg-card md:w-44"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {MEMBER_STATUS_ITEMS.map((item) => (
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
