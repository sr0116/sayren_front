"use client";

import {use2faQuery} from "@/hooks/use2faQuery";
import OtpCheckForm from "@/components/member/OtpCheckForm";
import PasswordCheckForm from "@/components/member/PasswordCheckForm";

export default function OtpOrPasswordCheckForm({ children }) {
  const { data: has2FA, isLoading } = use2faQuery();

  if (isLoading) return <div>확인중...</div>;

  if (!has2FA) {
    // 2차인증이 없는 경우
    return <PasswordCheckForm>{children}</PasswordCheckForm>;
  }

  // 2차인증이 있는 경우
  return <OtpCheckForm>{children}</OtpCheckForm>;
}
