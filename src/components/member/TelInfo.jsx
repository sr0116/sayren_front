"use client";

import {useApiQuery} from "@/hooks/useApi";
import {formatPhoneNumber} from "@/components/common/Format";


export default function TelInfo() {

  const { data, isLoading, isError } = useApiQuery(
      ["memberTel"],
      "/api/user/member/get-tel",
      {
        options: {
          staleTime: 1000 * 30,
          cacheTime: 0,
        },
      }
  );

  if (isLoading) return <p>불러오는 중...</p>;
  if (isError) return <p>조회 실패</p>;

  const tel = data?.telinfo;


  return(
      <div className="mb-6 flex flex-col gap-2">
        <p className="font-semibold text-gray-600">현재 등록된 휴대폰 번호</p>
        <p className="font-medium text-2xl text-gray-700">{formatPhoneNumber(tel)}</p>
      </div>
  )
}