import type { OrderKeyEnum } from "@/common/enums/order-key";
import type { TUserPaginationResponse } from "@/api/main/modules/master/iam/users/types/user-pagination-response";
import type { UserGuestFilterEnum } from "@/app/(authenticated)/dashboard/master/iam/users/_enums/user-guest-filter";
import type { TUserCardListSortBy } from "./user-card-list-sort-by";

export type TUserCardListQueryTable = {
  page: number;
  pageSize: number;
  search: string;
  sortBy: TUserCardListSortBy | null;
  order: OrderKeyEnum | null;
  roleIds: string[];
  isGuest: UserGuestFilterEnum | null;
};

export type TUserCardListActionHandler = {
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSearchChange: (value: string) => void;
  onFilterApply: (filters: {
    sortBy: TUserCardListSortBy | null;
    order: OrderKeyEnum | null;
    roleIds: string[];
    isGuest: UserGuestFilterEnum | null;
  }) => void;
  onDeleteUser: (id: string) => void;
};

export type TUserCardListProps = {
  data: TUserPaginationResponse[];
  isLoading: boolean;
  pageCount: number;
  rowCount: number;
  queryTable: TUserCardListQueryTable;
  roleItems: { value: string; label: string }[];
  onRoleSearchChange: (value: string) => void;
  onActionHandler: TUserCardListActionHandler;
};
