import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Funnel, Search } from "lucide-react";
import { If, Then } from "react-if";

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
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { STORY_STATUS_LABEL } from "@/api/main/modules/master/stories/enums/story-status-label";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { STORY_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-type-label";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import { STORY_LOCATION_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-location-type-label";

import StoryCard from "./story-card";
import StoryCardSkeleton from "./story-card-skeleton";
import type {
  TStoryCardListProps,
  TStoryCardListUserItem,
} from "@/app/(authenticated)/dashboard/master/stories/_types/story-card-list-props";
import type { TStoryCardListSortBy } from "@/app/(authenticated)/dashboard/master/stories/_types/story-card-list-sort-by";

let debounceSearchTimeoutId: NodeJS.Timeout | number | null = null;
let debounceUserSearchTimeoutId: NodeJS.Timeout | number | null = null;

const PAGE_SIZE_OPTIONS = [
  { label: "6 / page", value: 6 },
  { label: "12 / page", value: 12 },
  { label: "24 / page", value: 24 },
  { label: "48 / page", value: 48 },
];

const SORT_BY_OPTIONS: { label: string; value: TStoryCardListSortBy }[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status" },
  { label: "Type", value: "type" },
  { label: "Game System", value: "game_system" },
  { label: "Max Members", value: "max_members" },
  { label: "XP Awarded", value: "exp_awarded" },
  { label: "Gold Awarded", value: "point_awarded" },
  { label: "Start At", value: "start_at" },
  { label: "Location", value: "location_type" },
  { label: "Created At", value: "created_at" },
  { label: "Updated At", value: "updated_at" },
];

const SORT_ORDER_OPTIONS = [
  { label: "Ascending", value: OrderKeyEnum.ASC },
  { label: "Descending", value: OrderKeyEnum.DESC },
];

export default function StoryCardList({
  data,
  isLoading,
  pageCount,
  rowCount,
  queryTable,
  userItems,
  canFilterByCreator,
  onUserSearchChange,
  onActionHandler,
}: TStoryCardListProps) {
  const [filterSortBy, setFilterSortBy] = useState<TStoryCardListSortBy | null>(
    queryTable.sortBy ?? null,
  );
  const [filterOrder, setFilterOrder] = useState<OrderKeyEnum | null>(
    queryTable.order ?? null,
  );
  const [filterStatus, setFilterStatus] = useState<StoryStatusEnum | null>(
    queryTable.status ?? null,
  );
  const [filterType, setFilterType] = useState<StoryTypeEnum | null>(
    queryTable.type ?? null,
  );
  const [filterLocationType, setFilterLocationType] =
    useState<StoryLocationTypeEnum | null>(queryTable.locationType ?? null);
  const [filterCreatedBy, setFilterCreatedBy] = useState<string | null>(
    queryTable.createdBy ?? null,
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
      type: filterType,
      locationType: filterLocationType,
      createdBy: filterCreatedBy,
    });
  }, [
    filterSortBy,
    filterOrder,
    filterStatus,
    filterType,
    filterLocationType,
    filterCreatedBy,
    onActionHandler,
  ]);

  const onFilterClear = useCallback(() => {
    setFilterSortBy("updated_at");
    setFilterOrder(OrderKeyEnum.DESC);
    setFilterStatus(null);
    setFilterType(null);
    setFilterLocationType(null);
    setFilterCreatedBy(null);
    onUserSearchChange("");
    onActionHandler.onFilterApply({
      sortBy: null,
      order: null,
      status: null,
      type: null,
      locationType: null,
      createdBy: null,
    });
  }, [onUserSearchChange, onActionHandler]);

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
            Filter
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="flex flex-col gap-4 md:gap-2">
              <FieldGroup className="flex flex-col md:flex-row gap-4 md:gap-2">
                <Field className="grid gap-2">
                  <FieldLabel>Sort By</FieldLabel>
                  <Select
                    items={SORT_BY_OPTIONS}
                    value={filterSortBy ?? undefined}
                    onValueChange={(val) => setFilterSortBy(val || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {SORT_BY_OPTIONS.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field className="grid gap-2">
                  <FieldLabel>Sort Order</FieldLabel>
                  <Select
                    items={SORT_ORDER_OPTIONS}
                    value={filterOrder ?? undefined}
                    onValueChange={(val) => setFilterOrder(val || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {SORT_ORDER_OPTIONS.map((item) => (
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
                  <FieldLabel htmlFor="status">Status</FieldLabel>
                  <Combobox
                    id="status"
                    items={Object.values(StoryStatusEnum).filter(
                      (v): v is StoryStatusEnum => typeof v === "number",
                    )}
                    value={filterStatus}
                    itemToStringLabel={(item) => STORY_STATUS_LABEL[item]}
                    onValueChange={(value) => setFilterStatus(value || null)}
                  >
                    <ComboboxInput placeholder="Select status" showClear />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {STORY_STATUS_LABEL[item as StoryStatusEnum]}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>

                <Field className="grid gap-2">
                  <FieldLabel htmlFor="type">Type</FieldLabel>
                  <Combobox
                    id="type"
                    items={Object.values(StoryTypeEnum).filter(
                      (v): v is StoryTypeEnum => typeof v === "number",
                    )}
                    value={filterType}
                    itemToStringLabel={(item) => STORY_TYPE_LABEL[item]}
                    onValueChange={(value) => setFilterType(value || null)}
                  >
                    <ComboboxInput placeholder="Select type" showClear />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {STORY_TYPE_LABEL[item as StoryTypeEnum]}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>

                <Field className="grid gap-2">
                  <FieldLabel htmlFor="location-type">Location</FieldLabel>
                  <Combobox
                    id="location-type"
                    items={Object.values(StoryLocationTypeEnum).filter(
                      (v): v is StoryLocationTypeEnum => typeof v === "number",
                    )}
                    value={filterLocationType}
                    itemToStringLabel={(item) =>
                      STORY_LOCATION_TYPE_LABEL[item]
                    }
                    onValueChange={(value) => setFilterLocationType(value || null)}
                  >
                    <ComboboxInput placeholder="Select location" showClear />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {STORY_LOCATION_TYPE_LABEL[item as StoryLocationTypeEnum]}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>
              </FieldGroup>

              <If condition={canFilterByCreator}>
                <Then>
                  <FieldGroup>
                    <Field className="grid gap-2">
                      <FieldLabel htmlFor="created-by">Created By</FieldLabel>
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
                        <ComboboxInput placeholder="Search user" showClear />
                        <ComboboxContent>
                          <ComboboxEmpty>No users found.</ComboboxEmpty>
                          <ComboboxList>
                            {(item: TStoryCardListUserItem) => (
                              <ComboboxItem key={item.value} value={item}>
                                {item.label}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    </Field>
                  </FieldGroup>
                </Then>
              </If>

              <FieldGroup className="mt-2">
                <Field orientation="horizontal">
                  <Button
                    className="ms-auto"
                    variant="outline"
                    onClick={onFilterClear}
                  >
                    Clear
                  </Button>
                  <Button onClick={onFilterApply}>Apply</Button>
                </Field>
              </FieldGroup>
            </div>
          </PopoverContent>
        </Popover>

        <InputGroup>
          <InputGroupInput
            placeholder="Type minimum 3 characters to search ..."
            onChange={(event) => onSearchChange(event.target.value)}
            defaultValue={queryTable.search}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading &&
          Array.from({ length: queryTable.pageSize }).map((_, idx) => (
            <StoryCardSkeleton key={idx} />
          ))}

        {!isLoading &&
          data.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onArchive={onActionHandler.onArchiveStory}
              onUnarchive={onActionHandler.onUnarchiveStory}
              onDelete={onActionHandler.onDeleteStory}
            />
          ))}
      </div>

      <If condition={!isLoading && data.length === 0}>
        <Then>
          <p className="py-10 text-center text-muted-foreground">
            No stories found.
          </p>
        </Then>
      </If>

      {!isLoading && (
        <div className="flex flex-col md:flex-row justify-end items-center gap-2 mt-6">
          <span>
            {indexStart} - {indexEnd} of {rowCount} items
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
            items={PAGE_SIZE_OPTIONS}
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
                {PAGE_SIZE_OPTIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value.toString()}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
}
