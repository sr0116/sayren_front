"use client";

import React, {useState} from "react";
import SocialAuthHandler from "@/app/providers/SocialAuthHandler";
import {useMutation} from "@tanstack/react-query";
import {signup as signupApi} from "@/api/authApi";
import {useRouter} from "next/navigation";
import {PasswordInput, TextInput} from "@/components/common/Input";
import ServiceAgree from "@/components/term/ServiceAgree";
import PrivacyAgree from "@/components/term/PrivacyAgree";
import Button from "@/components/common/Button";
import {useDispatch} from "react-redux";
import {closeModal, openModal} from "@/store/modalSlice";
import SocialLoginButton from "@/components/auth/SocialLoginButton";
import {useFormInput} from "@/hooks/useFormInput";

export default function SignupPage() {

  const { formData: memberSignupDTO, handleChange } = useFormInput({
    email: "",
    password: "",
    name: "",
    serviceAgree: false,
    privacyAgree: false,
  })

  const [passwordCheck, setPasswordCheck] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      dispatch(openModal({
        content: (
          <div className="flex flex-col justify-center items-center gap-2">
            <h3>회원가입 성공</h3>
            <p>작성하신 이메일로 인증링크가 전송되었습니다.</p>
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
    },
    onError: (err) => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>회원가입에 실패했습니다. 다시 시도해주세요.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)
      }))
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(memberSignupDTO);
  };

  const isvalid = !(
    memberSignupDTO.email.trim() && // 이메일 공백 아님
    memberSignupDTO.password.trim() && // 비밀번호 공백 아님
    memberSignupDTO.name.trim() && // 이름 공백 아님
    memberSignupDTO.privacyAgree && // 약관 동의 체크
    memberSignupDTO.serviceAgree &&
    memberSignupDTO.password === passwordCheck // 비번 확인 일치
  )

  return (
    <div>
      <h2 className="text-center text-3xl font-medium mb-8">회원가입</h2>
      <div className="w-[400px] mx-auto rounded-lg p-6 border border-gray-200 bg-white">
        <SocialAuthHandler />
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <TextInput
              placeholder="이름"
              name="name"
              autoComplete="name"
              value={memberSignupDTO.name}
              onChange={handleChange}
            />
            <TextInput
              placeholder="이메일"
              type="email"
              name="email"
              autoComplete="email"
              value={memberSignupDTO.email}
              onChange={handleChange}
            />
            <PasswordInput
              placeholder="비밀번호"
              name="password"
              value={memberSignupDTO.password}
              onChange={handleChange}
            />
            {(memberSignupDTO.password.trim().length < 8 && memberSignupDTO.password.trim()) && (
              <p className="text-sm">8자리 이상, 공백불가</p>
            )}
            <TextInput
              type="password"
              placeholder="비밀번호 확인"
              name="passwordCheck"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            {(memberSignupDTO.password !== passwordCheck && passwordCheck.trim())&& (
              <p className="text-sm">비밀번호가 다릅니다</p>
            )}
            <ServiceAgree size={"m"} checked={memberSignupDTO.serviceAgree} onChange={handleChange} name="serviceAgree" />
            <PrivacyAgree size={"m"} checked={memberSignupDTO.privacyAgree} onChange={handleChange} name="privacyAgree" />
            <Button variant="primary" type="submit" disabled={isvalid}>
              회원가입
            </Button>
            <p className="text-xs text-center text-gray-500">
              또는 소셜 회원가입으로 간편하게 이용
            </p>
            <SocialLoginButton text={"회원가입"}/>
          </form>
      </div>
    </div>
  )

}