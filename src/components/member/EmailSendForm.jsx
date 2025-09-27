"use client";

import {TextInput} from "@/components/common/Input";
import React, {useCallback} from "react";
import {useFormInput} from "@/hooks/useFormInput";
import Button from "@/components/common/Button";
import {useEmailSendMutation} from "@/api/memberApi";
import {closeModal, openModal} from "@/store/modalSlice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

export default function EmailSendForm() {
  const { formData: emailForm, handleChange } = useFormInput({
    email: "",
  })
  const dispatch = useDispatch();
  const router = useRouter();

  const emailSendMutation = useEmailSendMutation({
    onSuccess: () => {
      dispatch(openModal({
          content: (
            <div className="flex flex-col justify-center items-center gap-4">
              <h3>메일 전송 성공</h3>
              <p>작성하신 이메일로 인증링크가 전송되었습니다.</p>
              <p>30분 내로 회원가입을 완료해주세요.</p>
              <Button variant={"primary"} onClick={() => {
                dispatch(closeModal());
              }}>
                확인
              </Button>
            </div>
          )
        }
      ))
      router.push("/");
    },
    onError: () => {
      dispatch(openModal({
          content: (
            <div className="flex flex-col justify-center items-center gap-4">
              <h3>이미 가입된 이메일입니다.</h3>
              <p>해당 이메일로 로그인해주세요.</p>
              <Button variant={"primary"} onClick={() => {
                dispatch(closeModal());
                setTimeout(() => router.push("/member/login"), 200);
              }}>
                확인
              </Button>
            </div>
          )
        }
      ))
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault();
    emailSendMutation.mutate({
      data: emailForm ,
    })
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextInput
        placeholder="이메일"
        type="email"
        name="email"
        autoComplete="email"
        value={emailForm.email}
        onChange={handleChange}
      />
      <Button variant="primary" type="submit" disabled={emailForm.email.trim().length === 0}>
        이메일 인증하기
      </Button>
    </form>
  )
}