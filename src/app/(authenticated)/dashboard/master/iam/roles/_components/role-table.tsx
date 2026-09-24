import { useCallback, useMemo, useState } from "react";
import {
  EllipsisVertical,
  Eye,
  Pencil,
  Search,
  Trash,
} from "lucide-react";
import Link from "next/link";
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
import dayjs from "@/libs/dayjs";

import type { TRoleTableCol } from "@/app/(authenticated)/dashboard/master/iam/roles/_types/role-table-col";
import type { TRoleTableProps } from "@/app/(authenticated)/dashboard/master/iam/roles/_types/role-table-props";

export default function RoleTable({
  data,
  isLoading,
  pageCount,
  rowCount,
  queryTable,
  onActionHandler,
}: TRoleTableProps) {
  const { auth } = useAuthContext();
  const [confirmedDeletedId, setConfirmedDeletedId] = useState<string | null>(
    null,
  );

  const canUpdateRoles = auth?.permissions.includes(PermissionEnum.ROLES_UPDATE);
  const canDeleteRoles = auth?.permissions.includes(PermissionEnum.ROLES_DELETE);

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
      header: "No.",
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
          label="Name"
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
          label="Description"
          sortKey="description"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onActionHandler.onSortingChange("description")}
        />
      ),
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
                  <Link
                    href={`/dashboard/master/iam/roles/${row.original.id}`}
                  />
                }
              >
                <Eye />
                View
              </DropdownMenuItem>
              {canUpdateRoles && (
                <DropdownMenuItem
                  render={
                    <Link
                      href={`/dashboard/master/iam/roles/${row.original.id}/edit`}
                    />
                  }
                >
                  <Pencil />
                  Edit
                </DropdownMenuItem>
              )}
              {canDeleteRoles && (
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
          },
        }}
      >
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
            <AlertDialogTitle>Delete role?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The role will be removed from the
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
