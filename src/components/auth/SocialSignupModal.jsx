"use client";

import React from "react";
import ServiceAgree from "@/components/term/ServiceAgree";
import PrivacyAgree from "@/components/term/PrivacyAgree";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { closeModal } from "@/store/modalSlice";
import { useSocialSignupMutation } from "@/api/authApi";
import { login } from "@/store/authSlice";
import { useFormInput } from "@/hooks/useFormInput";

export default function SocialSignupModal({ socialUser }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { formData: socialSignupRequestDTO, handleChange } = useFormInput({
    socialUser: socialUser,
    serviceAgree: false,
    privacyAgree: false,
  });

  const allAgreed =
      socialSignupRequestDTO.serviceAgree && socialSignupRequestDTO.privacyAgree;

  const socialSignupMutation = useSocialSignupMutation({
    onSuccess: (result) => {
      if (result && result.id) {
        dispatch(login({ data: result }));
        dispatch(closeModal());
        router.push("/");
      }
    },
    onError: (err) => {
      console.error("소셜 회원가입 실패:", err);
      alert(err.response?.data?.message || "회원가입에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleSignup = () => {
    socialSignupMutation.mutate({
      socialUser,
      serviceAgree: socialSignupRequestDTO.serviceAgree,
      privacyAgree: socialSignupRequestDTO.privacyAgree,
    });
  };

  return (
      <div className="bg-white rounded-2xl overflow-hidden">
        {/* 상단 헤더 */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">약관 동의</h2>
          <p className="text-xs text-gray-500">
            <span className="font-medium">{socialUser.provider}</span> 계정(
            {socialUser?.email || "알 수 없음"})으로 가입하려면 아래 약관에
            동의해야 합니다.
          </p>
        </div>

        {/* 본문 */}
        <div className="px-6 py-5 space-y-5">
          <ServiceAgree
              name="serviceAgree"
              size="xs"
              checked={socialSignupRequestDTO.serviceAgree}
              onChange={handleChange}
          />
          <PrivacyAgree
              name="privacyAgree"
              size="xs"
              checked={socialSignupRequestDTO.privacyAgree}
              onChange={handleChange}
          />
        </div>

        {/* 하단 버튼 */}
        <div className="px-6 py-4 border-t border-gray-200">
          <button
              onClick={handleSignup}
              disabled={!allAgreed || socialSignupMutation.isPending}
              className={`w-full py-3 rounded-lg font-medium text-white transition 
            ${
                  allAgreed && !socialSignupMutation.isPending
                      ? "bg-gray-900 hover:bg-gray-700 cursor-pointer"
                      : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            {socialSignupMutation.isPending ? "처리 중..." : "동의하고 계속하기"}
          </button>
        </div>
      </div>
  );
}
