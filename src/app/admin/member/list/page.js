"use client";

import MemberList from "@/components/admin/member/MemberList";
import {usePageParams} from "@/hooks/usePageParams";
import {useApiQuery} from "@/hooks/useApi";

export default function MemberListPage(){
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

  return(
      <div className="h-full">
        <MemberList data={data} isError={isError} isLoading={isLoading}/>
      </div>
  )
}