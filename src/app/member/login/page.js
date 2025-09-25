import SocialAuthHandler from "@/app/providers/SocialAuthHandler";
import React from "react";
import LoginForm from "@/components/member/LoginForm";

export default function LoginPage() {


  return (
    <div>
      <h2 className="text-center text-3xl font-medium mb-8">로그인</h2>
      <div className="w-[400px] mx-auto rounded-lg p-6 border border-gray-200 bg-white">
        <SocialAuthHandler />
        <LoginForm/>
      </div>
    </div>
  );
}
