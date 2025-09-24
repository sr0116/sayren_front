"use client";

import { useIsFetching } from "@tanstack/react-query";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";

// API 요청시 스피너
export default function GlobalLoading() {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return <LoadingSpinner size="lg" fullscreen />;
}
