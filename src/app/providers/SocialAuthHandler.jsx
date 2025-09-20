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
      if (event.origin !== "http://localhost:8080") return;
      const data = event.data;

      if (data.accessToken) {
        dispatch(login({ accessToken: data.accessToken }));
        router.push("/");
      } else if (data.error === "SIGNUP_REQUIRED") {
        dispatch(
          openModal(
            <SocialSignupModal
              socialUser={data.socialUser}
              onAgree={async ({ serviceAgree, privacyAgree }) => {
                try {
                  const result = await socialSignup({
                    socialUser: data.socialUser,
                    serviceAgree: serviceAgree,
                    privacyAgree: privacyAgree,
                  });

                  if (result.accessToken) {
                    dispatch(login({ accessToken: result.accessToken }));
                    dispatch(closeModal());
                    router.push("/");
                  }
                } catch (err) {
                  console.error("소셜 회원가입 실패:", err);
                }
              }}
            />
          )
        );
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
