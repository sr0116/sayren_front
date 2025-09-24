"use client";

import { useIsFetching } from "@tanstack/react-query";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";

export default function GlobalLoading() {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  // Api 같은 경우에는 논블로킹 모드 → blockUI={false}
  // 화면 전환 같은 경우 논 블로킹이나 블로킹 고민중
  return <LoadingSpinner size="lg" fullscreen blockUI={false} />;
}
