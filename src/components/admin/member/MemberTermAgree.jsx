import {TextInput} from "@/components/common/Input";
import React from "react";

export default function MemberTermAgree({terms}) {
  return (
    <div>
      {terms.map((t) => (
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 py-3">
          <p className="w-[120px] font-medium text-gray-500 shrink-0">{t.termType === "SERVICE" ? "이용약관" : "개인정보 처리방침"}</p>
          <p>{"ver " + t.version + (t.agreed ? " 동의" : " 동의 안함")}</p>
        </div>
      ))}
    </div>
  )
}