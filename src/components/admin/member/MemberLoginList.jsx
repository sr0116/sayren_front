"use client";

import {useApiQuery} from "@/hooks/useApi";
import {usePageParams} from "@/hooks/usePageParams";
import Pagination from "@/components/common/Pagination";
import LoginHistoryTable from "@/components/admin/member/LoginHistoryTable";

export default function MemberLoginList({memberId}){
  const { pageParams } = usePageParams();

  const { data, isLoading, isError } = useApiQuery(
      ["member-login-history", memberId, pageParams],
      `/api/admin/member/get-login`,
      {
        params: {memberId, ...pageParams},
        options: {
          keepPreviousData: true,
          staleTime: 0,
          cacheTime: 0,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        }
      }
  );
  if(isLoading) return null;
  if(isError) return (<div>에러가 발생하였습니다.</div>)

  return(
      <div>
        <LoginHistoryTable history={data.list}/>
        <Pagination data={data}/>
      </div>
  )
}