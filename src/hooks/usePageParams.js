"use client";

import { useSearchParams } from "next/navigation";

export function usePageParams() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const size = Number(searchParams.get("size") || 10);
  const type = searchParams.get("type") || null;
  const keyword = searchParams.get("keyword") || null;
  const sortBy = searchParams.get("sortBy") || null;
  const direction = searchParams.get("direction") || null;

  return {
    page,
    size,
    type,
    keyword,
    sortBy,
    direction,
    pageParams: { page, size, type, keyword, sortBy, direction },
  };
}
