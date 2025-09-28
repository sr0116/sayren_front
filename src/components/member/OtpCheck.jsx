"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import { useOtpCheckMutation } from "@/api/authApi";
import Check2fa from "@/components/member/Check2fa";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export default function OtpCheck({ children }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const otpCheckMutation = useOtpCheckMutation({
    onSuccess: () => {
      alert("OTP 인증 성공");
      queryClient.setQueryData(["2fa-check"], true, {
        updatedAt: Date.now(),
      });
      dispatch(closeModal());
      if (children.props.onClick) {
        children.props.onClick();
      }
    },
    onError: () => {
      alert("OTP 인증 실패");
    },
  });

  // 20분 캐싱 상태
  const { data: otpValid } = useQuery({
    queryKey: ["2fa-check"],
    queryFn: () => false,
    staleTime: 1000 * 60 * 20,
    initialData: false,
  });

  const handleClick = (e) => {
    e.preventDefault();

    if (otpValid) {
      if (children.props.onClick) {
        children.props.onClick(e);
      }
      return;
    }

    // OTP 모달 띄우기
    dispatch(
      openModal({
        content: (
          <div className="flex flex-col items-center gap-4 w-full">
            <h3 className="text-lg font-semibold">OTP 인증</h3>
            <Check2fa mutation={otpCheckMutation} buttonText="확인" />
          </div>
        ),
      })
    );
  };

  return (
    <>
      {children &&
        React.cloneElement(children, {
          onClick: handleClick,
        })}
    </>
  );
}
