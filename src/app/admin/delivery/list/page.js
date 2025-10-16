"use client";

import DeliveryTable from "@/components/delivery/DeliveryTable";
import {usePageParams} from "@/hooks/usePageParams";
import {useApiQuery} from "@/hooks/useApi";
import Pagination from "@/components/common/Pagination";

export default function DeliveryListPage() {

  const {pageParams} = usePageParams();
  const {data, isLoading, isError} = useApiQuery(
    ["delivery-list", pageParams],
    `/api/admin/deliveries/get-list`,
    {
      params: pageParams,
      options: {
        keepPreviousData: true,
        staleTime: 0,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    }
  );

  if(isLoading) return <div></div>
  if(isError) return <div>서버 오류입니다. 잠시후 다시 시도해주세요.</div>

  return (
    <div>
      <DeliveryTable deliveries={data?.list ?? []} />
      <Pagination data={data} />
    </div>
  )
}