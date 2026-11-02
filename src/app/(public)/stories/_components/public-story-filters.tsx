"use client";

import { useCallback, useMemo, useState } from "react";
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
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { useT } from "@/app/_hooks/use-t";

import { PUBLIC_STORY_STATUS_OPTIONS } from "@/app/(public)/stories/_constants/public-story-status-options";
import { PUBLIC_STORY_TYPE_ICON } from "@/app/(public)/stories/_constants/public-story-icons";
import { STORIES_MESSAGES } from "@/app/(public)/stories/_messages";
import type { TPublicStoryStatus } from "@/app/(public)/stories/_types/public-story-card-list-props";
import type { TPublicStoryFiltersProps } from "@/app/(public)/stories/_types/public-story-filters-props";

let debounceSearchTimeoutId: NodeJS.Timeout | number | null = null;

const ALL = "all";

const STATUS_I18N_KEY = {
  [StoryStatusEnum.PUBLISHED]: "enums.status.published",
  [StoryStatusEnum.COMPLETED]: "enums.status.completed",
} as const;

const TYPE_I18N_KEY = {
  [StoryTypeEnum.ONESHOT]: "enums.type.oneshot",
  [StoryTypeEnum.CAMPAIGN]: "enums.type.campaign",
} as const;

const LOCATION_I18N_KEY = {
  [StoryLocationTypeEnum.ONLINE]: "enums.location.online",
  [StoryLocationTypeEnum.OFFLINE]: "enums.location.offline",
} as const;

export default function PublicStoryFilters({
  queryTable,
  onSearchChange,
  onFilterApply,
}: TPublicStoryFiltersProps) {
  const { t } = useT(STORIES_MESSAGES);
  const [filterStatus, setFilterStatus] = useState<TPublicStoryStatus | null>(
    queryTable.status ?? null,
  );
  const [filterLocationType, setFilterLocationType] =
    useState<StoryLocationTypeEnum | null>(queryTable.locationType ?? null);

  const statusOptions = useMemo(
    () => [
      { label: t("filters.allStatuses"), value: ALL },
      ...PUBLIC_STORY_STATUS_OPTIONS.map((status) => ({
        label: t(STATUS_I18N_KEY[status]),
        value: String(status),
      })),
    ],
    [t],
  );

  const locationOptions = useMemo(
    () => [
      { label: t("filters.anywhere"), value: ALL },
      ...[StoryLocationTypeEnum.ONLINE, StoryLocationTypeEnum.OFFLINE].map(
        (location) => ({
          label: t(LOCATION_I18N_KEY[location]),
          value: String(location),
        }),
      ),
    ],
    [t],
  );

  const typeChips = useMemo(
    () => [
      { label: t("filters.allTypes"), value: null as StoryTypeEnum | null },
      {
        label: t(TYPE_I18N_KEY[StoryTypeEnum.ONESHOT]),
        value: StoryTypeEnum.ONESHOT,
      },
      {
        label: t(TYPE_I18N_KEY[StoryTypeEnum.CAMPAIGN]),
        value: StoryTypeEnum.CAMPAIGN,
      },
    ],
    [t],
  );

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
            placeholder={t("filters.searchPlaceholder")}
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
            {t("filters.filters")}
            {activeFilterCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[calc(100vw-2rem)] max-w-80">
            <FieldGroup className="gap-4">
              <Field className="grid gap-2">
                <FieldLabel>{t("filters.status")}</FieldLabel>
                <Select
                  items={statusOptions}
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
                      {statusOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field className="grid gap-2">
                <FieldLabel>{t("filters.location")}</FieldLabel>
                <Select
                  items={locationOptions}
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
                      {locationOptions.map((item) => (
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
                  {t("filters.clear")}
                </Button>
                <Button onClick={onApply}>{t("filters.apply")}</Button>
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
          {typeChips.map((chip) => {
            const Icon =
              chip.value != null ? PUBLIC_STORY_TYPE_ICON[chip.value] : null;
            return (
              <TabsTrigger
                key={chip.value != null ? String(chip.value) : ALL}
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
