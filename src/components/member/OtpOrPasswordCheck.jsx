"use client";

import OtpCheck from "@/components/member/OtpCheck";
import {use2faQuery} from "@/hooks/use2faQuery";

export default function OtpOrPasswordCheck({ children }) {
  const { data: has2FA, isLoading } = use2faQuery();

  if (isLoading) return <div>확인중...</div>;

  if (!has2FA) {
    // 2차인증이 없는 경우
    return <>{children}</>;
  }

  // 2차인증이 있는 경우
  return <OtpCheck>{children}</OtpCheck>;
}
