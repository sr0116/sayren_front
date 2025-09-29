"use client";

import { useQuery } from "@tanstack/react-query";
import {queryClient} from "@/lib/queryClient";

const TTL = 1000 * 60 * 20;

export function useSrCheck() {


  const { data: isChecked = false } = useQuery({
    queryKey: ["sr-check"],
    queryFn: () => false,
    staleTime: TTL,
    cacheTime: TTL,
  });

  const setChecked = (value) => {
    queryClient.setQueryData(["sr-check"], value);
  };

  return [isChecked, setChecked];
}
