"use client";

import React from "react";
import {TextInput} from "@/components/common/Input";
import Select from "@/components/common/Select";
import dayjs from "dayjs";
import TelInput from "@/components/auth/TelInput";
import MemberNameChange from "@/components/admin/member/MemberNameChange";
import MemberTelChange from "@/components/admin/member/MemberTelChange";
import MemberStatusChange from "@/components/admin/member/MemberStatusChange";
import MemberRoleChange from "@/components/admin/member/MemberRoleChange";

export default function MemberCard({ member, memberId }) {
  if (!member) return null;

  const disable = member.status === "DELETED";

  return (
      <div className="w-full flex flex-col gap-4">
        {/* 이름 */}
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
          <p className="w-[120px] font-medium text-gray-500 shrink-0">이름</p>
          <MemberNameChange name={member.name} memberId={memberId} disabled={disable} />
          {/*<TextInput name="name" value={member.name} className="flex-1" />*/}
        </div>

        {/* 이메일 */}
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
          <p className="w-[120px] font-medium text-gray-500 shrink-0">이메일</p>
          <TextInput name="email" value={member.email} disabled className="flex-1" />
        </div>

        {/* 전화번호 */}
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
          <p className="w-[120px] font-medium text-gray-500 shrink-0">전화번호</p>
          <MemberTelChange tel={member.tel} memberId={memberId} disabled={disable} />
        </div>

        {/* 상태 */}
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
          <p className="w-[120px] font-medium text-gray-500 shrink-0">상태</p>
          <MemberStatusChange status={member.status} memberId={memberId} />
        </div>

        {/* 권한 */}
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
          <p className="w-[120px] font-medium text-gray-500 shrink-0">권한</p>
          <MemberRoleChange roles={member.roles} memberId={memberId} disabled={disable}/>
        </div>

        {/* 가입일 + 수정일 */}
        <div className="flex flex-col md:flex-row justify-between gap-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 flex-1">
            <p className="w-[120px] font-medium text-gray-500 shrink-0">가입일</p>
            <p>{dayjs(member.regDate).format("YYYY년 MM월 DD일")}</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 flex-1">
            <p className="w-[120px] font-medium text-gray-500 shrink-0">최근 수정 / 삭제</p>
            <p>{dayjs(member.modDate).format("YYYY년 MM월 DD일")}</p>
          </div>
        </div>
      </div>
  );
}
