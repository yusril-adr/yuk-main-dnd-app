import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TPublicEventMemberPaginationPayload } from "./types/public-event-member-pagination-payload";
import type { TPublicEventMemberPaginationResponse } from "./types/public-event-member-pagination-response";

// Public endpoint; identifier is the id or slug. 404 unless the event is
// published or completed
export const getPublicEventMemberPagination = async ({
  identifier,
  payload,
}: {
  identifier: string;
  payload: TPublicEventMemberPaginationPayload;
}): Promise<
  AxiosResponse<
    TMainApiPaginationResponse<TPublicEventMemberPaginationResponse>
  >
> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.EVENT.MEMBERS(identifier),
    { params: payload },
  );
  return response;
};
