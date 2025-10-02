import React from "react";
import dayjs from "dayjs";

export default function MemberProvider({providers}){
  return (
      <div>
        {providers.map((p) => (
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 py-3">
            <p className="w-[120px] font-medium text-gray-500 shrink-0">{p.provider}</p>
            <div className="flex gap-4 items-center">
              <p>{p.email}</p>
              <p className="text-sm text-gray-500">- {dayjs(p.regDate).format("YYYY년 MM월 DD일")} 연동됨</p>
            </div>
          </div>
        ))}
      </div>
  )
}