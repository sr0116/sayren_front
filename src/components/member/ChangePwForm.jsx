"use client";

import {PasswordInput, TextInput} from "@/components/common/Input";
import Button from "@/components/common/Button";
import React, {useState} from "react";
import {useFormInput} from "@/hooks/useFormInput";
import {useResetPwMutation} from "@/api/memberApi";
import {closeModal, openModal} from "@/store/modalSlice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

export default function ChangePwForm({token, buttonText}) {

  const dispatch = useDispatch();
  const router = useRouter();
  const {formData: resetPasswordRequestDTO, handleChange} = useFormInput({
    token: token || "",
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
      if(!!token.trim()){
        router.push("/member/login");
      }
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


  return (
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
        {buttonText}
      </Button>
    </form>
  )
}