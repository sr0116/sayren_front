"use client";

import React, { useState } from "react";

import ServiceAgree from "@/components/term/ServiceAgree";
import PrivacyAgree from "@/components/term/PrivacyAgree";

export default function SocialSignupModal({ socialUser, onAgree }) {
  const [serviceAgree, setServiceAgree] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);

  const allAgreed = serviceAgree && privacyAgree;

  return (
    <div className=" bg-white rounded-2xl overflow-hidden">
      {/* 상단 헤더 */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">약관 동의</h2>
        <p className="text-xs text-gray-500">
          <span className="font-medium">{socialUser.provider}</span> 계정(
          {socialUser?.email || "알 수 없음"})으로 가입하려면 아래 약관에
          동의해야 합니다.
        </p>
      </div>

      {/* 본문 */}
      <div className="px-6 py-5 space-y-5">
        {/* 서비스 약관 */}
        <ServiceAgree size={"xs"}  checked={serviceAgree}  onChange={(e) => setServiceAgree(e.target.checked)} name="serviceAgree" />
        <PrivacyAgree size={"xs"} checked={privacyAgree} onChange={(e) => setPrivacyAgree(e.target.checked)} name="privacyAgree" />
      </div>

      {/* 하단 버튼 */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <button
          onClick={() => onAgree({ serviceAgree, privacyAgree })}
          disabled={!allAgreed}
          className={`w-full py-3 rounded-lg font-medium text-white transition 
            ${allAgreed ? "bg-gray-900 hover:bg-gray-700 cursor-pointer" : "bg-gray-300 cursor-not-allowed"}
          `}
        >
          동의하고 계속하기
        </button>
      </div>
    </div>
  );
}
