import FindIdForm from "@/components/member/FindIdForm";
import Link from "next/link";
import React from "react";

export default function FindIdPage() {
  return (
      <div>
        <h2 className="text-center text-3xl font-medium mb-8">아이디 찾기</h2>
        <div className="max-w-[400px] mx-auto rounded-lg p-6 border border-gray-200 bg-white">
          <FindIdForm />
        </div>
        <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
          <Link href="/member/login" className="hover:underline">
            로그인
          </Link>
          <Link href="/member/signup" className="hover:underline">
            회원가입
          </Link>
          <Link href="/member/find-pw" className="hover:underline">
            비밀번호 찾기
          </Link>
        </div>
      </div>
  )
}