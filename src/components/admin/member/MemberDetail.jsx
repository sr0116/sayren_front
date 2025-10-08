"use client";

import {useApiQuery} from "@/hooks/useApi";
import MemberCard from "@/components/admin/member/MemberCard";
import MemberTermAgree from "@/components/admin/member/MemberTermAgree";
import MemberProvider from "@/components/admin/member/MemberProvider";
import Member2FA from "@/components/admin/member/Member2FA";
import MemberLoginList from "@/components/admin/member/MemberLoginList";

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
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">유저</h2>
      <MemberCard member={data.memberDTO} memberId={memberId}/>
      <div className="border-b border-gray-300 my-8" />
      <h2 className="text-lg font-semibold text-gray-900 mb-4">약관 동의</h2>
      <MemberTermAgree terms={data.termList} />
      {data.memberDTO.status !== "DELETED" && (
        <div>
          <div className="border-b border-gray-300 my-8" />
          <h2 className="text-lg font-semibold text-gray-900 mb-4">소셜 연동</h2>
          <MemberProvider providers={data.providerList} memberId={memberId} />
          <div className="border-b border-gray-300 my-8" />
          <h2 className="text-lg font-semibold text-gray-900 mb-4">2차 인증</h2>
          <Member2FA tfa={data.tfa} memberId={memberId}/>
        </div>
      )}
      <div className="border-b border-gray-300 my-8" />
      <h2 className="text-lg font-semibold text-gray-900 mb-4">로그인 내역</h2>
      <MemberLoginList memberId={memberId}/>
    </div>
  )
}