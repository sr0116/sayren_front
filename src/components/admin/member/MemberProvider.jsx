import React from "react";
import dayjs from "dayjs";
import MemberProviderDelelte from "@/components/admin/member/MemberProviderDelelte";

export default function MemberProvider({providers, memberId}){
  return (
      <div>
        {providers.map((p) => (
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 py-3" key={p.provider}>
            <p className="w-[120px] font-medium text-gray-500 shrink-0">{p.provider}</p>
            <div className="flex gap-4 items-center flex-1 pe-2">
              <p className="flex-1">{p.email}</p>
              <span className="text-sm text-gray-500">{dayjs(p.regDate).format("YYYY년 MM월 DD일")} 연동</span>
            </div>
            <MemberProviderDelelte provider={p.provider} memberId={memberId} />
          </div>
        ))}
      </div>
  )
}