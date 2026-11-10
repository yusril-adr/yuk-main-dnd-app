import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Funnel, Search } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { ButtonGroup } from "@/app/_components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/app/_components/ui/combobox";
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
import { OrderKeyEnum } from "@/common/enums/order-key";
import { generatePages } from "@/utils/table-helper";
import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";
import { useT } from "@/app/_hooks/use-t";

import EventCard from "./event-card";
import EventCardSkeleton from "./event-card-skeleton";
import type { TEventCardListProps } from "@/app/(authenticated)/dashboard/master/events/_types/event-card-list-props";
import type { TEventCardListUserItem } from "@/app/(authenticated)/dashboard/master/events/_types/event-card-list-user-item";
import type { TEventCardListSortBy } from "@/app/(authenticated)/dashboard/master/events/_types/event-card-list-sort-by";
import { MASTER_EVENTS_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/_messages";

let debounceSearchTimeoutId: NodeJS.Timeout | number | null = null;
let debounceUserSearchTimeoutId: NodeJS.Timeout | number | null = null;

const PAGE_SIZE_VALUES = [6, 12, 24, 48] as const;

const STATUS_MESSAGE_KEY = {
  [EventStatusEnum.DRAFT]: "enums.status.draft",
  [EventStatusEnum.PUBLISHED]: "enums.status.published",
  [EventStatusEnum.ARCHIVED]: "enums.status.archived",
  [EventStatusEnum.CANCELLED]: "enums.status.cancelled",
  [EventStatusEnum.COMPLETED]: "enums.status.completed",
} as const;

const LOCATION_MESSAGE_KEY = {
  [EventLocationTypeEnum.ONLINE]: "enums.location.online",
  [EventLocationTypeEnum.OFFLINE]: "enums.location.offline",
} as const;

const SORT_BY_VALUES: TEventCardListSortBy[] = [
  "title",
  "status",
  "max_members",
  "exp_awarded",
  "point_awarded",
  "start_at",
  "location_type",
  "created_at",
  "updated_at",
];

const SORT_BY_MESSAGE_KEY = {
  title: "sort.title",
  status: "sort.status",
  max_members: "sort.maxMembers",
  exp_awarded: "sort.expAwarded",
  point_awarded: "sort.goldAwarded",
  start_at: "sort.startAt",
  location_type: "sort.location",
  created_at: "sort.createdAt",
  updated_at: "sort.updatedAt",
} as const satisfies Record<TEventCardListSortBy, string>;

export default function EventCardList({
  data,
  isLoading,
  pageCount,
  rowCount,
  queryTable,
  userItems,
  defaultCreatedBy,
  onUserSearchChange,
  onActionHandler,
}: TEventCardListProps) {
  const { t } = useT(MASTER_EVENTS_MESSAGES);
  const [filterSortBy, setFilterSortBy] = useState<TEventCardListSortBy | null>(
    queryTable.sortBy ?? null,
  );
  const [filterOrder, setFilterOrder] = useState<OrderKeyEnum | null>(
    queryTable.order ?? null,
  );
  const [filterStatus, setFilterStatus] = useState<EventStatusEnum | null>(
    queryTable.status ?? null,
  );
  const [filterLocationType, setFilterLocationType] =
    useState<EventLocationTypeEnum | null>(queryTable.locationType ?? null);
  const [filterCreatedBy, setFilterCreatedBy] = useState<string | null>(
    queryTable.createdBy ?? null,
  );

  const sortByOptions = useMemo(
    () =>
      SORT_BY_VALUES.map((value) => ({
        label: t(SORT_BY_MESSAGE_KEY[value]),
        value,
      })),
    [t],
  );

  const sortOrderOptions = useMemo(
    () => [
      { label: t("sort.asc"), value: OrderKeyEnum.ASC },
      { label: t("sort.desc"), value: OrderKeyEnum.DESC },
    ],
    [t],
  );

  const pageSizeOptions = useMemo(
    () =>
      PAGE_SIZE_VALUES.map((value) => ({
        label: t("pagination.perPage", { count: value }),
        value,
      })),
    [t],
  );

  const statusLabel = useCallback(
    (status: EventStatusEnum) => t(STATUS_MESSAGE_KEY[status]),
    [t],
  );

  const locationLabel = useCallback(
    (location: EventLocationTypeEnum) => t(LOCATION_MESSAGE_KEY[location]),
    [t],
  );

  const pages = useMemo(
    () =>
      generatePages({
        currentPage: queryTable.page,
        totalPages: pageCount,
      }),
    [queryTable.page, pageCount],
  );

  const dataStartIndex = (queryTable.page - 1) * queryTable.pageSize;
  const indexStart = rowCount === 0 ? 0 : dataStartIndex + 1;
  const indexEnd = Math.min(dataStartIndex + data.length, rowCount);
  const isFirstPage = queryTable.page === 1;
  const isLastPage = queryTable.page === pageCount;

  const onSearchChange = useCallback(
    (value: string) => {
      if (value && value.length < 3) {
        return;
      }

      if (debounceSearchTimeoutId) {
        clearTimeout(debounceSearchTimeoutId);
      }

      debounceSearchTimeoutId = setTimeout(() => {
        onActionHandler.onSearchChange(value);
      }, 300);
    },
    [onActionHandler],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      onActionHandler.onPageChange(page);
    },
    [onActionHandler],
  );

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      onActionHandler.onPageSizeChange(pageSize);
    },
    [onActionHandler],
  );

  const onFilterApply = useCallback(() => {
    onActionHandler.onFilterApply({
      sortBy: filterSortBy,
      order: filterOrder,
      status: filterStatus,
      locationType: filterLocationType,
      createdBy: filterCreatedBy,
    });
  }, [
    filterSortBy,
    filterOrder,
    filterStatus,
    filterLocationType,
    filterCreatedBy,
    onActionHandler,
  ]);

  const onFilterClear = useCallback(() => {
    setFilterSortBy("updated_at");
    setFilterOrder(OrderKeyEnum.DESC);
    setFilterStatus(null);
    setFilterLocationType(null);
    setFilterCreatedBy(defaultCreatedBy);
    onUserSearchChange("");
    onActionHandler.onFilterApply({
      sortBy: null,
      order: null,
      status: null,
      locationType: null,
      createdBy: defaultCreatedBy,
    });
  }, [defaultCreatedBy, onUserSearchChange, onActionHandler]);

  const handleUserSearchChange = useCallback(
    (value: string) => {
      if (debounceUserSearchTimeoutId) {
        clearTimeout(debounceUserSearchTimeoutId);
      }
      debounceUserSearchTimeoutId = setTimeout(() => {
        onUserSearchChange(value);
      }, 300);
    },
    [onUserSearchChange],
  );

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-6">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            <Funnel />
            {t("filters.filter")}
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="flex flex-col gap-4 md:gap-2">
              <FieldGroup className="flex flex-col md:flex-row gap-4 md:gap-2">
                <Field className="grid gap-2">
                  <FieldLabel>{t("filters.sortBy")}</FieldLabel>
                  <Select
                    items={sortByOptions}
                    value={filterSortBy ?? undefined}
                    onValueChange={(val) => setFilterSortBy(val || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("filters.selectField")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {sortByOptions.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field className="grid gap-2">
                  <FieldLabel>{t("filters.sortOrder")}</FieldLabel>
                  <Select
                    items={sortOrderOptions}
                    value={filterOrder ?? undefined}
                    onValueChange={(val) => setFilterOrder(val || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("filters.selectOrder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {sortOrderOptions.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>

              <FieldGroup className="flex flex-col md:flex-row gap-4 md:gap-2">
                <Field className="grid gap-2">
                  <FieldLabel htmlFor="status">
                    {t("filters.status")}
                  </FieldLabel>
                  <Combobox
                    id="status"
                    items={Object.values(EventStatusEnum).filter(
                      (v): v is EventStatusEnum => typeof v === "number",
                    )}
                    value={filterStatus}
                    itemToStringLabel={(item) => statusLabel(item)}
                    onValueChange={(value) => setFilterStatus(value || null)}
                  >
                    <ComboboxInput
                      placeholder={t("filters.selectStatus")}
                      showClear
                    />
                    <ComboboxContent>
                      <ComboboxEmpty>{t("filters.noItemsFound")}</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {statusLabel(item as EventStatusEnum)}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>

                <Field className="grid gap-2">
                  <FieldLabel htmlFor="location-type">
                    {t("filters.location")}
                  </FieldLabel>
                  <Combobox
                    id="location-type"
                    items={Object.values(EventLocationTypeEnum).filter(
                      (v): v is EventLocationTypeEnum => typeof v === "number",
                    )}
                    value={filterLocationType}
                    itemToStringLabel={(item) => locationLabel(item)}
                    onValueChange={(value) =>
                      setFilterLocationType(value || null)
                    }
                  >
                    <ComboboxInput
                      placeholder={t("filters.selectLocation")}
                      showClear
                    />
                    <ComboboxContent>
                      <ComboboxEmpty>{t("filters.noItemsFound")}</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {locationLabel(item as EventLocationTypeEnum)}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field className="grid gap-2">
                  <FieldLabel htmlFor="created-by">
                    {t("filters.createdBy")}
                  </FieldLabel>
                  <Combobox
                    id="created-by"
                    items={userItems}
                    value={
                      userItems.find(
                        (item) => item.value === filterCreatedBy,
                      ) ?? null
                    }
                    onValueChange={(item) =>
                      setFilterCreatedBy(item?.value ?? null)
                    }
                    onInputValueChange={handleUserSearchChange}
                    itemToStringLabel={(item) => item.label}
                  >
                    <ComboboxInput
                      placeholder={t("filters.searchUser")}
                      showClear
                    />
                    <ComboboxContent>
                      <ComboboxEmpty>{t("filters.noUsersFound")}</ComboboxEmpty>
                      <ComboboxList>
                        {(item: TEventCardListUserItem) => (
                          <ComboboxItem key={item.value} value={item}>
                            {item.label}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>
              </FieldGroup>

              <FieldGroup className="mt-2">
                <Field orientation="horizontal">
                  <Button
                    className="ms-auto"
                    variant="outline"
                    onClick={onFilterClear}
                  >
                    {t("filters.clear")}
                  </Button>
                  <Button onClick={onFilterApply}>{t("filters.apply")}</Button>
                </Field>
              </FieldGroup>
            </div>
          </PopoverContent>
        </Popover>

        <InputGroup>
          <InputGroupInput
            placeholder={t("filters.searchPlaceholder")}
            onChange={(event) => onSearchChange(event.target.value)}
            defaultValue={queryTable.search}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <If condition={isLoading}>
          <Then>
            {Array.from({ length: queryTable.pageSize }).map((_, idx) => (
              <EventCardSkeleton key={idx} />
            ))}
          </Then>
          <Else>
            {data.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Else>
        </If>
      </div>

      <If condition={!isLoading && data.length === 0}>
        <Then>
          <p className="py-10 text-center text-muted-foreground">
            {t("empty.title")}
          </p>
        </Then>
      </If>

      <If condition={!isLoading}>
        <Then>
          <div className="flex flex-col md:flex-row justify-end items-center gap-2 mt-6">
            <span>
              {t("pagination.range", {
                start: indexStart,
                end: indexEnd,
                total: rowCount,
              })}
            </span>

            <ButtonGroup>
              <Button
                variant="ghost"
                size="icon"
                disabled={isFirstPage}
                onClick={() => handlePageChange(queryTable.page - 1)}
              >
                <ChevronLeft />
              </Button>

              {pages.map((page) => (
                <Button
                  key={page}
                  variant="ghost"
                  size="icon"
                  disabled={page === queryTable.page}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="ghost"
                size="icon"
                disabled={isLastPage}
                onClick={() => handlePageChange(queryTable.page + 1)}
              >
                <ChevronRight />
              </Button>
            </ButtonGroup>

            <Select
              items={pageSizeOptions}
              value={Number(queryTable.pageSize)}
              onValueChange={(val) =>
                handlePageSizeChange(val || queryTable.pageSize)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {pageSizeOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value.toString()}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </Then>
      </If>
    </>
  );
}
