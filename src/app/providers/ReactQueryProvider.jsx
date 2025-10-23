"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";
import {api} from "@/lib/axios";
import {useEffect} from "react";


export function Init2FA() {
  const hasActiveFlag =
      typeof document !== "undefined" &&
      document.cookie.includes("SR_ACTIVE");

  useEffect(() => {
    if (!hasActiveFlag) {
      return;
    }

    (async () => {
      try {
        const res = await queryClient.fetchQuery({
          queryKey: ["2fa"],
          queryFn: () => api.get("/api/auth/read-2fa"),
          staleTime: Infinity,
          cacheTime: Infinity,
        });

        const isSuccess = res?.message === "success";
        queryClient.setQueryData(["2fa"], isSuccess);
      } catch (err) {
        queryClient.setQueryData(["2fa"], false);
      }
    })();
  }, [hasActiveFlag]);

  return null;
}

export default function ReactQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Init2FA />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
