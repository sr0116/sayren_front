"use client";

import {useApiQuery} from "@/hooks/useApi";
import Pagination from "@/components/common/Pagination";
import {usePageParams} from "@/hooks/usePageParams";
import MemberTable from "@/components/admin/member/MemberTable";

export default function MemberList(){
  const { pageParams } = usePageParams();
  const { data, isLoading, isError } = useApiQuery(
      ["members"],
      `/api/admin/member/get-list`,
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

  if (isLoading) return <p>로딩중...</p>;
  if (isError) return <p>에러 발생!</p>;

  return (
      <div className="h-full flex flex-col justify-between">
        <MemberTable members={data.list}/>
        <Pagination data={data}/>
      </div>
  )
}