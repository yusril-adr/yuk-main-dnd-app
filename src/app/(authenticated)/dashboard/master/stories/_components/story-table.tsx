import { useCallback, useMemo, useState } from "react";
import {
  EllipsisVertical,
  Eye,
  Funnel,
  Pencil,
  Search,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { If, Then, Else } from "react-if";
import type { SortingState } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Field, FieldGroup, FieldLabel } from "@/app/_components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/app/_components/ui/combobox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import {
  DataTable,
  DataTableSortableColHeader,
} from "@/app/_components/data-table";
import { OrderKeyEnum } from "@/common/enums/order-key";
import { PermissionEnum } from "@/common/enums/permission";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { toTitleCase } from "@/utils/format-text";
import dayjs from "@/libs/dayjs";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

import StoryStatusBadge from "@/app/(authenticated)/dashboard/master/stories/_components/story-status-badge";
import type { TStoryTableCol } from "@/app/(authenticated)/dashboard/master/stories/_types/story-table-col";
import type {
  TStoryTableProps,
  TStoryTableUserItem,
} from "@/app/(authenticated)/dashboard/master/stories/_types/story-table-props";

let debounceUserSearchTimeoutId: NodeJS.Timeout | number | null = null;

export default function StoryTable({
  data,
  isLoading,
  pageCount,
  rowCount,
  queryTable,
  columnFilters,
  userItems,
  canFilterByCreator,
  onActionHandler,
}: TStoryTableProps) {
  const { auth } = useAuthContext();
  const filterForm = onActionHandler.onFilterForm;
  const [confirmedDeletedId, setConfirmedDeletedId] = useState<string | null>(
    null,
  );

  const canUpdateStories = auth?.permissions.includes(
    PermissionEnum.STORIES_UPDATE,
  );
  const canDeleteStories = auth?.permissions.includes(
    PermissionEnum.STORIES_DELETE,
  );

  const onDeleteHandler = useCallback(() => {
    if (confirmedDeletedId) {
      onActionHandler.onDeleteStory(confirmedDeletedId);
    }

    setConfirmedDeletedId(null);
  }, [confirmedDeletedId, onActionHandler]);

  const handleUserSearchChange = useCallback(
    (value: string) => {
      if (debounceUserSearchTimeoutId) {
        clearTimeout(debounceUserSearchTimeoutId);
      }

      debounceUserSearchTimeoutId = setTimeout(() => {
        onActionHandler.onUserSearchChange(value);
      }, 300);
    },
    [onActionHandler],
  );

  const columnHelper = createColumnHelper<TStoryTableCol>();
  const columns = [
    columnHelper.display({
      id: "no",
      header: "No.",
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        const startIndex = (pageIndex - 1) * pageSize;
        return `${startIndex + row.index + 1}.`;
      },
    }),

    columnHelper.accessor("title", {
      header: () => (
        <DataTableSortableColHeader
          label="Title"
          sortKey="title"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onActionHandler.onSortingChange("title")}
        />
      ),
      cell: ({ row }) => (
        <Button
          variant="link"
          render={
            <Link href={`/dashboard/master/stories/${row.original.id}`} />
          }
          nativeButton={false}
        >
          {row.original.title}
        </Button>
      ),
    }),

    columnHelper.accessor("status", {
      header: () => (
        <DataTableSortableColHeader
          label="Status"
          sortKey="status"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onActionHandler.onSortingChange("status")}
        />
      ),
      cell: (info) => <StoryStatusBadge status={info.getValue()} />,
    }),

    columnHelper.accessor("type", {
      header: () => (
        <DataTableSortableColHeader
          label="Type"
          sortKey="type"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onActionHandler.onSortingChange("type")}
        />
      ),
      cell: (info) => toTitleCase(info.getValue()),
    }),

    columnHelper.accessor("game_system", {
      header: () => (
        <DataTableSortableColHeader
          label="Game System"
          sortKey="game_system"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onActionHandler.onSortingChange("game_system")}
        />
      ),
      cell: (info) => info.getValue() || "-",
    }),

    columnHelper.accessor("location_type", {
      header: () => (
        <DataTableSortableColHeader
          label="Location"
          sortKey="location_type"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onActionHandler.onSortingChange("location_type")}
        />
      ),
      cell: (info) => toTitleCase(info.getValue()),
    }),

    columnHelper.accessor("start_at", {
      header: () => (
        <DataTableSortableColHeader
          label="Start At"
          sortKey="start_at"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onActionHandler.onSortingChange("start_at")}
        />
      ),
      cell: (info) => (
        <If condition={!!info.getValue()}>
          <Then>{dayjs(info.getValue()).format("YYYY-MM-DD HH:mm")}</Then>
          <Else>-</Else>
        </If>
      ),
    }),

    columnHelper.accessor((row) => row.created_by?.display_name, {
      id: "created_by",
      header: "Created By",
      cell: (info) => info.getValue() || "-",
    }),

    columnHelper.accessor("created_at", {
      header: () => (
        <DataTableSortableColHeader
          label="Created At"
          sortKey="created_at"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onActionHandler.onSortingChange("created_at")}
        />
      ),
      cell: (info) => dayjs(info.getValue()).format("YYYY-MM-DD HH:mm:ss"),
    }),

    columnHelper.display({
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button size="icon-sm" variant="ghost">
                <EllipsisVertical />
              </Button>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={
                  <Link href={`/dashboard/master/stories/${row.original.id}`} />
                }
              >
                <Eye />
                View
              </DropdownMenuItem>
              {canUpdateStories && (
                <DropdownMenuItem
                  render={
                    <Link
                      href={`/dashboard/master/stories/${row.original.id}/edit`}
                    />
                  }
                >
                  <Pencil />
                  Edit
                </DropdownMenuItem>
              )}
              {canDeleteStories && (
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setConfirmedDeletedId(row.original.id)}
                >
                  <Trash />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
  ];

  const sorting = useMemo<SortingState>(() => {
    if (!queryTable.sortBy) {
      return [];
    }

    return [
      {
        id: queryTable.sortBy,
        desc: queryTable.order === OrderKeyEnum.DESC,
      },
    ];
  }, [queryTable.order, queryTable.sortBy]);

  return (
    <>
      <DataTable
        data={data}
        isLoading={isLoading}
        onPageChange={onActionHandler.onPageChange}
        onPageSizeChange={onActionHandler.onPageSizeChange}
        tableOptions={{
          columns,
          pageCount,
          rowCount,
          state: {
            pagination: {
              pageIndex: queryTable.page,
              pageSize: queryTable.pageSize,
            },
            sorting,
            columnFilters,
          },
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              <Funnel />
              Filter
            </PopoverTrigger>
            <PopoverContent align="start">
              <form
                className="flex flex-col gap-4 md:gap-2"
                onSubmit={filterForm.onFilterSubmit}
              >
                <FieldGroup className="flex flex-col md:flex-row gap-4 md:gap-2">
                  <Controller
                    name="status"
                    control={filterForm.filterControl}
                    render={({ field, fieldState }) => (
                      <Field
                        className="grid gap-2"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldLabel htmlFor="status">Status</FieldLabel>
                        <Combobox
                          id="status"
                          items={Object.values(StoryStatusEnum)}
                          onValueChange={(value) => {
                            field.onChange(value === "" ? undefined : value);
                          }}
                          {...field}
                        >
                          <ComboboxInput placeholder="Select status" showClear />
                          <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem key={item} value={item}>
                                  {item}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </Field>
                    )}
                  />

                  <Controller
                    name="type"
                    control={filterForm.filterControl}
                    render={({ field, fieldState }) => (
                      <Field
                        className="grid gap-2"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldLabel htmlFor="type">Type</FieldLabel>
                        <Combobox
                          id="type"
                          items={Object.values(StoryTypeEnum)}
                          onValueChange={(value) => {
                            field.onChange(value === "" ? undefined : value);
                          }}
                          {...field}
                        >
                          <ComboboxInput placeholder="Select type" showClear />
                          <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem key={item} value={item}>
                                  {item}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </Field>
                    )}
                  />

                  <Controller
                    name="locationType"
                    control={filterForm.filterControl}
                    render={({ field, fieldState }) => (
                      <Field
                        className="grid gap-2"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldLabel htmlFor="location-type">Location</FieldLabel>
                        <Combobox
                          id="location-type"
                          items={Object.values(StoryLocationTypeEnum)}
                          onValueChange={(value) => {
                            field.onChange(value === "" ? undefined : value);
                          }}
                          {...field}
                        >
                          <ComboboxInput placeholder="Select location" showClear />
                          <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem key={item} value={item}>
                                  {item}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </Field>
                    )}
                  />

                  <If condition={canFilterByCreator}>
                    <Then>
                      <Controller
                        name="createdBy"
                        control={filterForm.filterControl}
                        render={({ field, fieldState }) => (
                          <Field
                            className="grid gap-2"
                            data-invalid={fieldState.invalid}
                          >
                            <FieldLabel htmlFor="created-by">
                              Created By
                            </FieldLabel>
                            <Combobox
                              id="created-by"
                              items={userItems}
                              value={
                                userItems.find(
                                  (item) => item.value === field.value,
                                ) ?? null
                              }
                              onValueChange={(item) =>
                                field.onChange(item?.value ?? null)
                              }
                              onInputValueChange={handleUserSearchChange}
                              itemToStringLabel={(item) => item.label}
                            >
                              <ComboboxInput
                                placeholder="Search user"
                                showClear
                              />
                              <ComboboxContent>
                                <ComboboxEmpty>No users found.</ComboboxEmpty>
                                <ComboboxList>
                                  {(item: TStoryTableUserItem) => (
                                    <ComboboxItem key={item.value} value={item}>
                                      {item.label}
                                    </ComboboxItem>
                                  )}
                                </ComboboxList>
                              </ComboboxContent>
                            </Combobox>
                          </Field>
                        )}
                      />
                    </Then>
                  </If>
                </FieldGroup>

                <FieldGroup className="mt-2">
                  <Field orientation="horizontal">
                    <Button
                      className="ms-auto"
                      variant="outline"
                      type="reset"
                      onClick={filterForm.onFilterReset}
                    >
                      Clear
                    </Button>

                    <Button type="submit">Apply</Button>
                  </Field>
                </FieldGroup>
              </form>
            </PopoverContent>
          </Popover>

          <InputGroup>
            <InputGroupInput
              placeholder="Type minimum 3 characters to search ..."
              onChange={(event) =>
                onActionHandler.onSearchChange(event.target.value)
              }
              defaultValue={queryTable.search}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </DataTable>

      <AlertDialog
        open={confirmedDeletedId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmedDeletedId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete story?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The story will be removed from the
              system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onDeleteHandler}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
