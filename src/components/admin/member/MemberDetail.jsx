"use client";

import {useApiQuery} from "@/hooks/useApi";

export default function MemberDetail({memberId}){
  const { data, isLoading, isError } = useApiQuery(
    ["member-info", memberId],
    `/api/admin/member/get-info`,
    {
      params: {memberId},
      options: {
        keepPreviousData: true,
        staleTime: 0,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    }
  );

  if(isLoading) return (<div>확인중...</div>);
  if(isError) return (<div>존재하지 않는 유저입니다.</div>);

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}