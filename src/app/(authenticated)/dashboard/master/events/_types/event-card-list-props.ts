import type { TEventPaginationResponse } from "@/api/main/modules/master/events/types/event-pagination-response";
import type { TEventCardListQueryTable } from "./event-card-list-query-table";
import type { TEventCardListUserItem } from "./event-card-list-user-item";
import type { TEventCardListActionHandler } from "./event-card-list-action-handler";

export type TEventCardListProps = {
  data: TEventPaginationResponse[];
  isLoading: boolean;
  pageCount: number;
  rowCount: number;
  queryTable: TEventCardListQueryTable;
  userItems: TEventCardListUserItem[];
  /** Creator the list falls back to on "Clear" (the current user). */
  defaultCreatedBy: string | null;
  onUserSearchChange: (value: string) => void;
  onActionHandler: TEventCardListActionHandler;
};
