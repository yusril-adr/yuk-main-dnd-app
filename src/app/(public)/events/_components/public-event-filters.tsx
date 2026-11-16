"use client";

import { useCallback, useMemo, useState } from "react";
import { Funnel, Search } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
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
import { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";
import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import { useT } from "@/app/_hooks/use-t";

import { PUBLIC_EVENT_STATUS_OPTIONS } from "@/app/(public)/events/_constants/public-event-status-options";
import { EVENTS_MESSAGES } from "@/app/(public)/events/_messages";
import type { TPublicEventStatus } from "@/app/(public)/events/_types/public-event-card-list-props";
import type { TPublicEventFiltersProps } from "@/app/(public)/events/_types/public-event-filters-props";

let debounceSearchTimeoutId: NodeJS.Timeout | number | null = null;

const ALL = "all";

const STATUS_I18N_KEY = {
  [EventStatusEnum.PUBLISHED]: "enums.status.published",
  [EventStatusEnum.COMPLETED]: "enums.status.completed",
} as const;

const LOCATION_I18N_KEY = {
  [EventLocationTypeEnum.ONLINE]: "enums.location.online",
  [EventLocationTypeEnum.OFFLINE]: "enums.location.offline",
} as const;

export default function PublicEventFilters({
  queryTable,
  onSearchChange,
  onFilterApply,
}: TPublicEventFiltersProps) {
  const { t } = useT(EVENTS_MESSAGES);
  const [filterStatus, setFilterStatus] = useState<TPublicEventStatus | null>(
    queryTable.status ?? null,
  );
  const [filterLocationType, setFilterLocationType] =
    useState<EventLocationTypeEnum | null>(queryTable.locationType ?? null);

  const statusOptions = useMemo(
    () => [
      { label: t("filters.allStatuses"), value: ALL },
      ...PUBLIC_EVENT_STATUS_OPTIONS.map((status) => ({
        label: t(STATUS_I18N_KEY[status]),
        value: String(status),
      })),
    ],
    [t],
  );

  const locationOptions = useMemo(
    () => [
      { label: t("filters.anywhere"), value: ALL },
      ...[EventLocationTypeEnum.ONLINE, EventLocationTypeEnum.OFFLINE].map(
        (location) => ({
          label: t(LOCATION_I18N_KEY[location]),
          value: String(location),
        }),
      ),
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

  const onApply = useCallback(() => {
    onFilterApply({
      status: filterStatus,
      locationType: filterLocationType,
    });
  }, [filterStatus, filterLocationType, onFilterApply]);

  const onClear = useCallback(() => {
    setFilterStatus(null);
    setFilterLocationType(null);
    onFilterApply({
      status: null,
      locationType: null,
    });
  }, [onFilterApply]);

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
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
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
                        : (Number(val) as TPublicEventStatus),
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
                        : (Number(val) as EventLocationTypeEnum),
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

    </div>
  );
}
