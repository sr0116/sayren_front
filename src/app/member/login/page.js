import SocialAuthHandler from "@/app/providers/SocialAuthHandler";
import React from "react";
import LoginForm from "@/components/member/LoginForm";
import Link from "next/link";

export default function LoginPage() {


  return (
    <div>
      <h2 className="text-center text-3xl font-medium mb-8">로그인</h2>
      <div className="max-w-[400px] mx-auto rounded-lg p-6 border border-gray-200 bg-white">
        <SocialAuthHandler />
        <LoginForm/>
      </div>
      <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
        <Link href="/member/signup" className="hover:underline">
          회원가입
        </Link>
        <Link href="/member/find-id" className="hover:underline">
          아이디 찾기
        </Link>
        <Link href="/" className="hover:underline">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}
