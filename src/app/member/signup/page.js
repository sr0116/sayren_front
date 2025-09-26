import SignupForm from "@/components/auth/SignupForm";
import SocialAuthHandler from "@/app/providers/SocialAuthHandler";
import Link from "next/link";
import React from "react";

export const revalidate = false;

export default async function SignupPage() {
  const [privacyRes, serviceRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/terms/privacy`, { cache: "force-cache" }),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/terms/service`, { cache: "force-cache" }),
  ]);

  const [privacyData, serviceData] = await Promise.all([
    privacyRes.json(),
    serviceRes.json(),
  ]);


  return (
    <div>
      <h2 className="text-center text-3xl font-medium mb-8">회원가입</h2>
      <div className="max-w-[400px] mx-auto rounded-lg p-6 border border-gray-200 bg-white">
        <SocialAuthHandler />
        <SignupForm initialPrivacy={privacyData} initialService={serviceData} />
      </div>
      <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
        <Link href="/member/login" className="hover:underline">
          로그인
        </Link>
        <Link href="/member/find-id" className="hover:underline">
          아이디 찾기
        </Link>
        <Link href="/" className="hover:underline">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  )

}