// app/providers/SocialAuthHandler.jsx
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/store/authSlice";
import { socialSignup } from "@/api/authApi";
import { openModal, closeModal } from "@/store/modalSlice";
import SocialSignupModal from "@/components/auth/SocialSignupModal";
import SocialLinkModal from "@/components/auth/SocialLinkModal";

export default function SocialAuthHandler() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const handler = (event) => {
      if (event.origin !== process.env.NEXT_PUBLIC_SPRING_API_BASE_URL) return;
      const data = event.data;

      if (data && data.id) {
        // ✅ 로그인 성공 → DTO 응답
        dispatch(login({ data }));
        router.push("/");
      } else if (data.error === "SIGNUP_REQUIRED") {
        dispatch(openModal(<SocialSignupModal socialUser={data.socialUser} />));
      } else if (data.error === "LINK_REQUIRED") {
        dispatch(openModal(<SocialLinkModal socialUser={data.socialUser} />));
      } else {
        console.error("소셜 로그인 실패:", data);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [dispatch, router]);

  return null;
}
