"use client";

import DeliveryTable from "@/components/delivery/DeliveryTable";
import {usePageParams} from "@/hooks/usePageParams";
import {useApiQuery} from "@/hooks/useApi";
import Pagination from "@/components/common/Pagination";

export default function DeliveryListPage() {
  const deliveries = [
    {
      deliveryId: 1,
      memberId: 101,
      addressId: 3001,
      type: "DELIVERY", // 출고 배송
      status: "READY", // 배송 대기
      regDate: "2025-10-13T09:30:00",
      modDate: "2025-10-13T09:30:00"
    },
    {
      deliveryId: 2,
      memberId: 102,
      addressId: 3002,
      type: "DELIVERY",
      status: "SHIPPING", // 배송 중
      regDate: "2025-10-12T15:00:00",
      modDate: "2025-10-13T11:00:00"
    },
    {
      deliveryId: 3,
      memberId: 103,
      addressId: 3003,
      type: "RETURN", // 회수 요청
      status: "PICKUP_READY", // 픽업 준비 완료
      regDate: "2025-10-11T13:20:00",
      modDate: "2025-10-12T10:00:00"
    },
    {
      deliveryId: 4,
      memberId: 104,
      addressId: 3004,
      type: "RETURN",
      status: "PICKED_UP", // 회수 완료
      regDate: "2025-10-10T08:45:00",
      modDate: "2025-10-11T09:15:00"
    }
  ];

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
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <DeliveryTable deliveries={data.list}/>
      <Pagination data={data} />
    </div>
  )
}