import CONFIG from "@/common/constants/config";
import AccessToken from "@/libs/cookies/access-token";
import { globalQueryClient } from "@/libs/react-query/global-query-client";

export function logout() {
  AccessToken.remove();
  globalQueryClient.setQueryData(
    [CONFIG.QUERY_KEY.REQUESTOR_API.AUTH.ME()],
    null,
  );
  globalQueryClient.removeQueries({
    queryKey: [CONFIG.QUERY_KEY.REQUESTOR_API.AUTH.ALL()],
  });

  const currentUrl = new URL(window.location.href);
  const currentPath = currentUrl.pathname;

  if (currentPath !== "/login") {
    const from = encodeURIComponent(currentPath + currentUrl.search);
    window.location.href = `/login?from=${from}`;
  }
}
