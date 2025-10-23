import React from "react";
import Member2faDelete from "@/components/admin/member/Member2faDelete";

export default function Member2FA({tfa, memberId}){
  return (
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 py-3">
        <p className="w-[120px] font-medium text-gray-500 shrink-0">2차인증</p>
        <p className="flex-1">{tfa ? "연동됨" : "연동 안됨"}</p>
        {tfa && <Member2faDelete memberId={memberId}/>}
      </div>
  )
}