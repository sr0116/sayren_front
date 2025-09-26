"use client";

import React, {useState} from "react";
import {useFormInput} from "@/hooks/useFormInput";
import {PasswordInput, TextInput} from "@/components/common/Input";
import Button from "@/components/common/Button";
import {noApi} from "@/lib/axios";
import NotFound from "@/app/not-found";
import {useResetPwMutation} from "@/api/memberApi";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {closeModal, openModal} from "@/store/modalSlice";
import {useQuery} from "@tanstack/react-query";

export default function ResetPwForm({token}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const {isLoading, isError} = useQuery({
    queryKey: ["reset-validate", token],
    queryFn: async () => {
      const res = await noApi.get(`/api/auth/reset-pw/validate?token=${token}`);
      return res.data ?? true;
    },
    enabled: !!token,
    retry: false,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });


  const {formData: resetPasswordRequestDTO, handleChange} = useFormInput({
    token: token,
    newPassword: "",
  })
  const [passwordCheck, setPasswordCheck] = useState("");

  const check = resetPasswordRequestDTO.newPassword.trim().length >= 8 &&
      resetPasswordRequestDTO.newPassword.trim() === passwordCheck.trim();

  const resetPasswordMutation = useResetPwMutation({
    onSuccess: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>비밀번호 변경이 완료되었습니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)
      }))
      router.push("/member/login");
    },
    onError: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>현재 사용중인 비밀번호와 동일합니다. 다른 비밀번호를 입력해주세요.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)
      }))
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPasswordMutation.mutate({
      data: resetPasswordRequestDTO
    })
  }

  if (isLoading) return <div>검증 중...</div>;
  if (isError) return <NotFound/>;


  return (
      <div>
        <h2 className="text-center text-3xl font-medium mb-8">비밀번호 재설정</h2>
        <div className="max-w-[400px] mx-auto rounded-lg p-6 border border-gray-200 bg-white">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <PasswordInput
                placeholder="새 비밀번호"
                name="newPassword"
                value={resetPasswordRequestDTO.newPassword}
                onChange={handleChange}
            />
            {(resetPasswordRequestDTO.newPassword.trim().length < 8 && resetPasswordRequestDTO.newPassword.trim()) && (
                <p className="text-sm">8자리 이상, 공백불가</p>
            )}
            <TextInput
                type="password"
                placeholder="새 비밀번호 확인"
                name="passwordCheck"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
            />
            {(resetPasswordRequestDTO.newPassword !== passwordCheck && passwordCheck.trim()) && (
                <p className="text-sm">비밀번호가 다릅니다</p>
            )}
            <Button variant="primary" disabled={!check}>
              비밀번호 재설정
            </Button>
          </form>
        </div>
      </div>
    )
}