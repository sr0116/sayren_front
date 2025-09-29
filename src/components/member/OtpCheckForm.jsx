"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import Button from "@/components/common/Button";
import { useOtpCheckMutation } from "@/api/authApi";
import { useFormInput } from "@/hooks/useFormInput";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {NumberInput} from "@/components/common/Input";

const TTL = 1000 * 60 * 20;

export default function OtpCheckForm({ children }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // 20분간 유지되는 OTP 상태
  const { data: isChecked = false } = useQuery({
    queryKey: ["2fa-check"],
    queryFn: () => false,
    staleTime: TTL,
    cacheTime: TTL,
  });

  const { formData: otpCheckDTO, handleChange } = useFormInput({
    otp: "",
  });

  const otpCheckMutation = useOtpCheckMutation({
    onSuccess: () => {
      queryClient.setQueryData(["2fa-check"], true);
    },
    onError: () => {
      dispatch(
          openModal({
            content: (
                <div className="flex flex-col justify-center items-center gap-2">
                  <p>OTP 인증 실패</p>
                  <Button
                      variant="primary"
                      onClick={() => {
                        dispatch(closeModal());
                      }}
                  >
                    확인
                  </Button>
                </div>
            ),
          })
      );
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    otpCheckMutation.mutate({
      data: otpCheckDTO,
    });
  };

  return (
      <div className="w-full">
        {isChecked ? (
            <div>{children}</div>
        ) : (
            <div className="flex gap-2 w-full">
              <NumberInput
                  type="text"
                  name="otp"
                  placeholder="OTP 코드 입력"
                  value={otpCheckDTO.otp}
                  onChange={handleChange}
                  maxLength={6}
              />
              <Button
                  variant="primary"
                  className="max-w-[120px]"
                  disabled={otpCheckDTO.otp.trim().length !== 6}
                  type="button"
                  onClick={handleClick}
              >
                OTP 인증
              </Button>
            </div>
        )}
      </div>
  );
}
