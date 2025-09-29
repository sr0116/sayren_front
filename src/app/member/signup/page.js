import SocialAuthHandler from "@/app/providers/SocialAuthHandler";
import Link from "next/link";
import React from "react";
import SocialLoginButton from "@/components/auth/SocialLoginButton";
import EmailSendForm from "@/components/member/EmailSendForm";


export default function SignupPage() {

  return (
    <div>
      <h2 className="text-center text-3xl font-medium mb-8">회원가입</h2>
      <div className="max-w-[400px] mx-auto rounded-lg p-6 border border-gray-200 bg-white">
        <SocialAuthHandler />
        <EmailSendForm />
        <p className="text-xs text-center text-gray-500 my-4">
          또는 소셜 회원가입으로 간편하게 이용
        </p>
        <SocialLoginButton text={"회원가입"}/>
      </div>
      <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
        <Link href="/member/login" className="hover:underline">
          로그인
        </Link>
        <Link href="/member/find-id" className="hover:underline">
          아이디 찾기
        </Link>
        <Link href="/member/find-pw" className="hover:underline">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  )

}