import { useApiQuery } from "@/hooks/useApi";
import {queryClient} from "@/lib/queryClient";

export function use2faQuery() {
  const hasActiveFlag =
      typeof document !== "undefined" &&
      document.cookie.includes("SR_ACTIVE");

  const cached = queryClient.getQueryData(["2fa"]);

  return useApiQuery(["2fa"], "/api/auth/read-2fa", {
    params: {}, // 필요 없으면 생략 가능
    options: {
      enabled: hasActiveFlag && cached === undefined,
      initialData: cached,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (res) => {
        console.log("2FA 응답:", res);
        queryClient.setQueryData(["2fa"], true);
      },
      onError: (err) => {
        console.log("2FA 에러:", err);
        queryClient.setQueryData(["2fa"], false);
      },
    },
  });
}
