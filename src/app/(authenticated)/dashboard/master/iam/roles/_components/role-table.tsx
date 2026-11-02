import { useCallback, useMemo, useState } from "react";
import {
  EllipsisVertical,
  Eye,
  Funnel,
  Pencil,
  Search,
  Trash,
} from "lucide-react";
import { Controller } from "react-hook-form";
import Link from "next/link";
import type { SortingState } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { If, Then, Else } from "react-if";

import { Badge } from "@/app/_components/ui/badge";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
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
import dayjs from "@/libs/dayjs";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";

import type { TRoleTableCol } from "@/app/(authenticated)/dashboard/master/iam/roles/_types/role-table-col";
import type { TRoleTableProps } from "@/app/(authenticated)/dashboard/master/iam/roles/_types/role-table-props";
import { ROLE_SHOW_IN_PUBLIC_FILTER_OPTIONS } from "@/app/(authenticated)/dashboard/master/iam/roles/_constants/role-show-in-public-filter-options";
import { MASTER_ROLES_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/roles/_messages";

export default function RoleTable({
  data,
  isLoading,
  pageCount,
  rowCount,
  queryTable,
  columnFilters,
  onActionHandler,
}: TRoleTableProps) {
  const { t } = useT(MASTER_ROLES_MESSAGES);
  const { locale } = useLocale();
  const filterForm = onActionHandler.onFilterForm;
  const [confirmedDeletedId, setConfirmedDeletedId] = useState<string | null>(
    null,
  );

  const showInPublicFilterOptions = useMemo(
    () =>
      ROLE_SHOW_IN_PUBLIC_FILTER_OPTIONS.map((item) => ({
        label: t(`enums.showInPublic.${item.labelKey}`),
        value: item.value,
      })),
    [t],
  );

  const onDeleteHandler = useCallback(() => {
    if (confirmedDeletedId) {
      onActionHandler.onDeleteRole(confirmedDeletedId);
    }

    setConfirmedDeletedId(null);
  }, [confirmedDeletedId, onActionHandler]);

  const columnHelper = createColumnHelper<TRoleTableCol>();
  const columns = [
    columnHelper.display({
      id: "no",
      header: t("columns.no"),
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        const startIndex = (pageIndex - 1) * pageSize;
        return `${startIndex + row.index + 1}.`;
      },
    }),

    columnHelper.accessor("name", {
      header: () => (
        <DataTableSortableColHeader
          label={t("columns.name")}
          sortKey="name"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onActionHandler.onSortingChange("name")}
        />
      ),
      cell: ({ row }) => (
        <Button
          variant="link"
          render={
            <Link href={`/dashboard/master/iam/roles/${row.original.id}`} />
          }
          nativeButton={false}
        >
          {row.original.name}
        </Button>
      ),
    }),

    columnHelper.accessor("description", {
      header: () => (
        <DataTableSortableColHeader
          label={t("columns.description")}
          sortKey="description"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onActionHandler.onSortingChange("description")}
        />
      ),
      cell: (info) => info.getValue() || "-",
    }),

    columnHelper.accessor("is_show_in_public", {
      header: () => (
        <DataTableSortableColHeader
          label={t("columns.showInPublic")}
          sortKey="is_show_in_public"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onActionHandler.onSortingChange("is_show_in_public")}
        />
      ),
      cell: (info) => (
        <If condition={info.getValue()}>
          <Then>
            <Badge>{t("enums.showInPublic.yes")}</Badge>
          </Then>
          <Else>
            <Badge variant="secondary">{t("enums.showInPublic.no")}</Badge>
          </Else>
        </If>
      ),
    }),

    columnHelper.accessor("created_at", {
      header: () => (
        <DataTableSortableColHeader
          label={t("columns.createdAt")}
          sortKey="created_at"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onActionHandler.onSortingChange("created_at")}
        />
      ),
      cell: (info) =>
        dayjs(info.getValue()).locale(locale).format("YYYY-MM-DD HH:mm:ss"),
    }),

    columnHelper.display({
      id: "actions",
      header: t("columns.action"),
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
                  <Link
                    href={`/dashboard/master/iam/roles/${row.original.id}`}
                  />
                }
              >
                <Eye />
                {t("actions.view")}
              </DropdownMenuItem>
              {row.original.action_list.is_can_update && (
                <DropdownMenuItem
                  render={
                    <Link
                      href={`/dashboard/master/iam/roles/${row.original.id}/edit`}
                    />
                  }
                >
                  <Pencil />
                  {t("actions.edit")}
                </DropdownMenuItem>
              )}
              {row.original.action_list.is_can_delete && (
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setConfirmedDeletedId(row.original.id)}
                >
                  <Trash />
                  {t("actions.delete")}
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
              {t("filters.filter")}
            </PopoverTrigger>
            <PopoverContent align="start">
              <form
                className="flex flex-col gap-4 md:gap-2"
                onSubmit={filterForm.onFilterSubmit}
              >
                <FieldGroup className="flex flex-col md:flex-row gap-4 md:gap-2">
                  <Controller
                    name="isShowInPublic"
                    control={filterForm.filterControl}
                    render={({ field, fieldState }) => (
                      <Field
                        className="grid gap-2"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldLabel htmlFor="is-show-in-public">
                          {t("filters.showInPublic")}
                        </FieldLabel>
                        <Select
                          items={showInPublicFilterOptions}
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger
                            id="is-show-in-public"
                            className="w-full"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {showInPublicFilterOptions.map((item) => (
                                <SelectItem
                                  key={item.label}
                                  value={item.value}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                </FieldGroup>

                <FieldGroup className="mt-2">
                  <Field orientation="horizontal">
                    <Button
                      className="ms-auto"
                      variant="outline"
                      type="reset"
                      onClick={filterForm.onFilterReset}
                    >
                      {t("filters.clear")}
                    </Button>

                    <Button type="submit">{t("filters.apply")}</Button>
                  </Field>
                </FieldGroup>
              </form>
            </PopoverContent>
          </Popover>

          <InputGroup>
            <InputGroupInput
              placeholder={t("filters.searchPlaceholder")}
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
            <AlertDialogTitle>{t("dialogs.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("dialogs.deleteDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("dialogs.cancel")}</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onDeleteHandler}>
              {t("dialogs.deleteConfirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
