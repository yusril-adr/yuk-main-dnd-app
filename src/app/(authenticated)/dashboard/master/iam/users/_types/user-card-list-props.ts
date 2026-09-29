import type { OrderKeyEnum } from "@/common/enums/order-key";
import type { TUserResponse } from "@/api/main/modules/master/iam/users/types/user-response";
import type { TUserCardListSortBy } from "./user-card-list-sort-by";

export type TUserCardListQueryTable = {
  page: number;
  pageSize: number;
  search: string;
  sortBy: TUserCardListSortBy | null;
  order: OrderKeyEnum | null;
  roleIds: string[];
};

export type TUserCardListActionHandler = {
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSearchChange: (value: string) => void;
  onFilterApply: (filters: {
    sortBy: TUserCardListSortBy | null;
    order: OrderKeyEnum | null;
    roleIds: string[];
  }) => void;
  onDeleteUser: (id: string) => void;
};

export type TUserCardListProps = {
  data: TUserResponse[];
  isLoading: boolean;
  pageCount: number;
  rowCount: number;
  queryTable: TUserCardListQueryTable;
  roleItems: { value: string; label: string }[];
  onRoleSearchChange: (value: string) => void;
  onActionHandler: TUserCardListActionHandler;
};