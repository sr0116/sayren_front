"use client";

import {useApiQuery} from "@/hooks/useApi";
import QRcode from "@/components/member/QRcode";
import Button from "@/components/common/Button";
import OtpCheck from "@/components/member/OtpCheck";

export default function Member2FARead() {
  const { data, isLoading, isError } = useApiQuery(
    ["2fa"],
    "/api/auth/read-2fa",
    {
      options: {
        staleTime: 1000 * 30,
        cacheTime: 0,
      },
    }
  );

  if (isLoading) return (<div>확인중...</div>);

  if (isError) return (<QRcode/>);
  return (
    <div
      className="flex flex-col items-center justify-center p-8 bg-white w-full max-w-md mx-auto">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">2차 인증 사용 유저입니다.</h2>

      <p className="text-gray-600 text-center mb-6">
        계정 보안이 강화되었습니다.<br/>
        이제 안전하게 서비스를 이용하실 수 있습니다.
      </p>
      <OtpCheck>
        <Button variant="outline">2차 인증 해제</Button>
      </OtpCheck>
    </div>
  )
}