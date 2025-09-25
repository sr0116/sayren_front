"use client";

import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import Button from "@/components/common/Button";
import {useDispatch, useSelector} from "react-redux";
import {useApiMutation} from "@/hooks/useApi";
import {closeModal, openModal} from "@/store/modalSlice";
import React, {useEffect, useState} from "react";



export default function EmailVerifyPage(){
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const signupMutation = useApiMutation("POST", "/api/auth/email-verify", {
    options: {
      onSuccess: () => {
        dispatch(openModal({
            content: (<div className="flex flex-col justify-center items-center gap-2">
              <p>이메일로 인증링크가 전송되었습니다.</p>
              <Button variant={"primary"} onClick={() => {
                dispatch(closeModal());
              }}>
                확인
              </Button>
            </div>)}
        ));
        setCooldown(300);
      },
      onError: (err) => {
        dispatch(openModal({
            content: (<div className="flex flex-col justify-center items-center gap-2">
              <p>메일 전송에 실패했습니다. 다시 시도해주세요.</p>
              <Button variant={"primary"} onClick={() => {
                dispatch(closeModal());
              }}>
                확인
              </Button>
            </div>)
        }))
      },
    },
  });

  const emailSendHandler = () => {
    signupMutation.mutate();
  }

  const [cooldown, setCooldown] = useState(0); // 남은 시간(초)

  // 1초마다 cooldown 줄이기
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);


  return (
      <div className="flex items-center justify-center h-full">
        <div className="h-full text-center items-center flex">
          {user?.emailVerified ? (
            <div>
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
              <h1 className="text-2xl font-bold mt-4">이메일 인증 완료</h1>
              <p className="text-gray-600 mt-2">
                이제 모든 서비스를 자유롭게 이용할 수 있습니다.
              </p>
            </div>
          ) : (
            <div>
              <XCircle className="w-20 h-20 text-red-500 mx-auto" />
              <h1 className="text-2xl font-bold mt-4">미인증 상태</h1>
              <p className="text-gray-600 mt-2">
                이메일 인증이 필요합니다.
              </p>
              <Button
                variant={"outline"}
                className={"flex items-center justify-center gap-2 mt-8"}
                onClick={emailSendHandler}
                disabled={cooldown > 0} // 쿨다운 중이면 비활성화
              >
                <RefreshCw className="w-5 h-5" />
                {cooldown > 0
                  ? `재전송 대기중 (${Math.floor(cooldown / 60)}:${String(
                    cooldown % 60
                  ).padStart(2, "0")})`
                  : "인증 메일 재전송"}
              </Button>
            </div>
          ) }
        </div>
      </div>
  )
}