"use client";

import {useApiQuery} from "@/hooks/useApi";
import Pagination from "@/components/common/Pagination";
import {usePageParams} from "@/hooks/usePageParams";

export default function MemberList(){
  const { pageParams } = usePageParams();
  const { data, isLoading, isError } = useApiQuery(
      ["members"],
      `/api/admin/member/get-list?` + {pageParams},
      {
        // params: pageParams,
        options: {
          keepPreviousData: true,
          staleTime: 0,
          cacheTime: 0,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        }
      }
  );

  // const { page, totalPages, hasPrev, hasNext } = data;

  if (isLoading) return <p>로딩중...</p>;
  if (isError) return <p>에러 발생!</p>;

  return (
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        {/*<Pagination data={data}/>*/}
      </div>
  )
}