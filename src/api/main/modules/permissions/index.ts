import type { AxiosResponse } from "axios";
import { PermissionEnum } from "@/common/enums/permission";
import { OrderKeyEnum } from "@/common/enums/order-key";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TPermissionResponse } from "./types/permission-response";
import type { TPermissionSortBy } from "./consts/permission-sort-by";
import type { TPermissionPaginationPayload } from "./types/permission-pagination-payload";

const buildDummyPermissionItems = (): TPermissionResponse[] =>
  Object.values(PermissionEnum).map((key, index) => {
    const [module, action] = key.split(":");

    return {
      id: `permission-${String(index + 1).padStart(2, "0")}`,
      module,
      action,
      key,
      created_at: "2025-01-01T00:00:00.000Z",
      updated_at: "2025-01-01T00:00:00.000Z",
    };
  });

const sortPermissionItems = (
  items: TPermissionResponse[],
  sortBy: TPermissionSortBy,
  order: OrderKeyEnum,
): TPermissionResponse[] =>
  [...items].sort((a, b) => {
    const comparison = a[sortBy].localeCompare(b[sortBy]);

    return order === OrderKeyEnum.DESC ? -comparison : comparison;
  });

export const getPermissionPagination = async (
  payload: TPermissionPaginationPayload,
): Promise<AxiosResponse<TMainApiPaginationResponse<TPermissionResponse>>> => {
  const allItems = buildDummyPermissionItems();
  const search = payload.search?.trim().toLowerCase();

  const filteredItems = allItems.filter((item) => {
    if (payload.module && item.module !== payload.module) return false;
    if (payload.action && item.action !== payload.action) return false;

    if (search) {
      const isMatch = [item.module, item.action, item.key].some((value) =>
        value.toLowerCase().includes(search),
      );
      if (!isMatch) return false;
    }

    return true;
  });

  const sortedItems =
    payload.sort_by === undefined
      ? filteredItems
      : sortPermissionItems(
          filteredItems,
          payload.sort_by,
          payload.order ?? OrderKeyEnum.ASC,
        );

  const totalAllData = sortedItems.length;

  const page = payload.page ?? 1;
  const perPage = Math.max(payload.per_page ?? totalAllData, 1);
  const offset = (page - 1) * perPage;
  const pagedItems = sortedItems.slice(offset, offset + perPage);

  const response = {
    data: {
      status_code: 200,
      data: {
        items: pagedItems,
        meta: {
          total_all_data: totalAllData,
          total_view: pagedItems.length,
          max_view: perPage,
          current_page: page,
          total_page: Math.ceil(totalAllData / perPage),
        },
      },
    },
  } as AxiosResponse<TMainApiPaginationResponse<TPermissionResponse>>;

  return response;
};
