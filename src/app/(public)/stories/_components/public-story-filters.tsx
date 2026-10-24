import { useCallback, useState } from "react";
import { Funnel, Search } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import { Field, FieldGroup, FieldLabel } from "@/app/_components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { STORY_STATUS_LABEL } from "@/api/main/modules/master/stories/enums/story-status-label";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { STORY_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-type-label";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import { STORY_LOCATION_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-location-type-label";

import { PUBLIC_STORY_STATUS_OPTIONS } from "@/app/(public)/stories/_constants/public-story-status-options";
import { PUBLIC_STORY_TYPE_ICON } from "@/app/(public)/stories/_constants/public-story-icons";
import type { TPublicStoryStatus } from "@/app/(public)/stories/_types/public-story-card-list-props";
import type { TPublicStoryFiltersProps } from "@/app/(public)/stories/_types/public-story-filters-props";

let debounceSearchTimeoutId: NodeJS.Timeout | number | null = null;

const ALL = "all";

const STATUS_OPTIONS = [
  { label: "All statuses", value: ALL },
  ...PUBLIC_STORY_STATUS_OPTIONS.map((status) => ({
    label: STORY_STATUS_LABEL[status],
    value: String(status),
  })),
];

const LOCATION_OPTIONS = [
  { label: "Anywhere", value: ALL },
  ...[StoryLocationTypeEnum.ONLINE, StoryLocationTypeEnum.OFFLINE].map(
    (location) => ({
      label: STORY_LOCATION_TYPE_LABEL[location],
      value: String(location),
    }),
  ),
];

const TYPE_CHIPS: { label: string; value: StoryTypeEnum | null }[] = [
  { label: "All", value: null },
  {
    label: STORY_TYPE_LABEL[StoryTypeEnum.ONESHOT],
    value: StoryTypeEnum.ONESHOT,
  },
  {
    label: STORY_TYPE_LABEL[StoryTypeEnum.CAMPAIGN],
    value: StoryTypeEnum.CAMPAIGN,
  },
];

export default function PublicStoryFilters({
  queryTable,
  onSearchChange,
  onFilterApply,
}: TPublicStoryFiltersProps) {
  const [filterStatus, setFilterStatus] = useState<TPublicStoryStatus | null>(
    queryTable.status ?? null,
  );
  const [filterLocationType, setFilterLocationType] =
    useState<StoryLocationTypeEnum | null>(queryTable.locationType ?? null);

  const activeFilterCount = [queryTable.status, queryTable.locationType].filter(
    (value) => value != null,
  ).length;

  const handleSearchChange = useCallback(
    (value: string) => {
      if (value && value.length < 3) {
        return;
      }
      if (debounceSearchTimeoutId) {
        clearTimeout(debounceSearchTimeoutId);
      }
      debounceSearchTimeoutId = setTimeout(() => {
        onSearchChange(value);
      }, 300);
    },
    [onSearchChange],
  );

  // Type chips apply immediately; the popover keeps everything else
  const onTypeChipClick = useCallback(
    (type: StoryTypeEnum | null) => {
      onFilterApply({
        status: queryTable.status,
        type,
        locationType: queryTable.locationType,
      });
    },
    [onFilterApply, queryTable],
  );

  const onApply = useCallback(() => {
    onFilterApply({
      status: filterStatus,
      type: queryTable.type,
      locationType: filterLocationType,
    });
  }, [filterStatus, filterLocationType, queryTable.type, onFilterApply]);

  const onClear = useCallback(() => {
    setFilterStatus(null);
    setFilterLocationType(null);
    onFilterApply({
      status: null,
      type: queryTable.type,
      locationType: null,
    });
  }, [onFilterApply, queryTable.type]);

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <InputGroup className="h-11 rounded-md bg-card">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search stories by title (min. 3 characters)…"
            onChange={(event) => handleSearchChange(event.target.value)}
            defaultValue={queryTable.search}
          />
        </InputGroup>

        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                className="h-11 w-full shrink-0 rounded-md px-5 sm:w-auto"
              />
            }
          >
            <Funnel />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[calc(100vw-2rem)] max-w-80">
            <FieldGroup className="gap-4">
              <Field className="grid gap-2">
                <FieldLabel>Status</FieldLabel>
                <Select
                  items={STATUS_OPTIONS}
                  value={filterStatus != null ? String(filterStatus) : ALL}
                  onValueChange={(val) =>
                    setFilterStatus(
                      !val || val === ALL
                        ? null
                        : (Number(val) as TPublicStoryStatus),
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {STATUS_OPTIONS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field className="grid gap-2">
                <FieldLabel>Location</FieldLabel>
                <Select
                  items={LOCATION_OPTIONS}
                  value={
                    filterLocationType != null
                      ? String(filterLocationType)
                      : ALL
                  }
                  onValueChange={(val) =>
                    setFilterLocationType(
                      !val || val === ALL
                        ? null
                        : (Number(val) as StoryLocationTypeEnum),
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {LOCATION_OPTIONS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field orientation="horizontal">
                <Button className="ms-auto" variant="outline" onClick={onClear}>
                  Clear
                </Button>
                <Button onClick={onApply}>Apply</Button>
              </Field>
            </FieldGroup>
          </PopoverContent>
        </Popover>
      </div>

      {/* Type filter on shadcn Tabs; applies immediately */}
      <Tabs
        value={queryTable.type != null ? String(queryTable.type) : ALL}
        onValueChange={(value) =>
          onTypeChipClick(
            value === ALL || value == null
              ? null
              : (Number(value) as StoryTypeEnum),
          )
        }
      >
        <TabsList className="h-10! w-full rounded-md border bg-card p-1 sm:w-fit">
          {TYPE_CHIPS.map((chip) => {
            const Icon =
              chip.value != null ? PUBLIC_STORY_TYPE_ICON[chip.value] : null;
            return (
              <TabsTrigger
                key={chip.label}
                value={chip.value != null ? String(chip.value) : ALL}
                className="rounded-sm px-3 text-muted-foreground data-active:bg-primary data-active:text-primary-foreground data-active:shadow-none data-active:hover:text-primary-foreground sm:px-4"
              >
                {Icon && <Icon />}
                {chip.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
}
