"use client";

import QRcode from "@/components/member/QRcode";
import Button from "@/components/common/Button";
import OtpCheck from "@/components/member/OtpCheck";
import {useOtpDeleteMutation} from "@/api/authApi";
import {useDispatch} from "react-redux";
import {closeModal, openModal} from "@/store/modalSlice";
import React from "react";
import {queryClient} from "@/lib/queryClient";
import {use2faQuery} from "@/hooks/use2faQuery";

export default function Member2FARead() {
  const { data: has2FA, isLoading } = use2faQuery();

  const dispatch = useDispatch();
  const otpDeleteMutation = useOtpDeleteMutation({
    onSuccess: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>2차인증 해제가 완료되었습니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)}
      ));
      queryClient.setQueryData(["2fa"], false);
      queryClient.removeQueries({ queryKey: ["2fa-check"] });
      queryClient.removeQueries({ queryKey: ["2faqr"] });
    },
    onError: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>서버에 오류가 발생했습니다. 잠시후 다시 시도해주세요.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)}
      ));
    }
  })

  const handleClick = (e) => {
    e.preventDefault();
    otpDeleteMutation.mutate();
  }

  if (isLoading) {
    return <div>확인 중...</div>;
  }


  if (!has2FA) {
    return <QRcode />;
  }

  // 캐시에 true → 2FA 등록됨
  return (
      <div className="flex flex-col items-center justify-center p-8 bg-white w-full max-w-md mx-auto">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          2차 인증 사용 유저입니다.
        </h2>

        <p className="text-gray-600 text-center mb-6">
          계정 보안이 강화되었습니다.<br />
          이제 안전하게 서비스를 이용하실 수 있습니다.
        </p>

        <OtpCheck>
          <Button variant="outline" onClick={handleClick}>
            2차 인증 해제
          </Button>
        </OtpCheck>
      </div>
  );
}