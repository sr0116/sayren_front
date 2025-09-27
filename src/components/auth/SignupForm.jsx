"use client";

import {useFormInput} from "@/hooks/useFormInput";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {useSignupMutation} from "@/api/authApi";
import {closeModal, openModal} from "@/store/modalSlice";
import Button from "@/components/common/Button";
import {PasswordInput, TextInput} from "@/components/common/Input";
import ServiceAgree from "@/components/term/ServiceAgree";
import PrivacyAgree from "@/components/term/PrivacyAgree";
import NotFound from "@/app/not-found";
import {useQuery} from "@tanstack/react-query";
import {noApi} from "@/lib/axios";

export default function SignupForm({ initialPrivacy, initialService, token }) {

  const {data, isLoading, isError} = useQuery({
    queryKey: ["signup-next", token],
    queryFn: async () => {
      const res = await noApi.get(`/api/user/member/signup-next?token=${token}`);
      return res ?? true;
    },
    enabled: !!token,
    retry: false,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });


  const { formData: memberSignupDTO, setFormData: setMemberSignupDTO,  handleChange } = useFormInput({
    email: "",
    password: "",
    name: "",
    serviceAgree: false,
    privacyAgree: false,
    token: token,
  })

  useEffect(() => {
    if (data?.email) {
      setMemberSignupDTO((prev) => ({ ...prev, email: data.email }));
    }
  }, [data]);


  const [passwordCheck, setPasswordCheck] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const signupMutation = useSignupMutation({
    onSuccess: () => {
      dispatch(openModal({
          content: (
            <div className="flex flex-col justify-center items-center gap-4">
              <h3>회원가입 성공</h3>
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
        content: (<div className="flex flex-col justify-center items-center gap-4">
          <p>{err.response?.data?.message}</p>
          <p>회원가입에 실패했습니다. 다시 시도해주세요.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)
      }))
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation.mutate({
      data: memberSignupDTO
    });
  };

  const isvalid = !(
    memberSignupDTO.password.trim() && // 비밀번호 공백 아님
    memberSignupDTO.name.trim() && // 이름 공백 아님
    memberSignupDTO.privacyAgree && // 약관 동의 체크
    memberSignupDTO.serviceAgree &&
    memberSignupDTO.password === passwordCheck // 비번 확인 일치
  )


  if (isLoading) return <div></div>;
  if (isError) return <NotFound/>;


  return (
    <div>
      <h2 className="text-center text-3xl font-medium mb-8">회원가입</h2>
      <div className="max-w-[400px] mx-auto rounded-lg p-6 border border-gray-200 bg-white">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <TextInput
            name="email"
            value={memberSignupDTO.email || ""}
            disabled={true}
          />
          <TextInput
            placeholder="이름"
            name="name"
            autoComplete="name"
            value={memberSignupDTO.name}
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
          <ServiceAgree initialData={initialService} size={"m"} checked={memberSignupDTO.serviceAgree} onChange={handleChange} name="serviceAgree" />
          <PrivacyAgree initialData={initialPrivacy} size={"m"} checked={memberSignupDTO.privacyAgree} onChange={handleChange} name="privacyAgree" />
          <Button variant="primary" type="submit" disabled={isvalid}>
            회원가입
          </Button>
        </form>
      </div>
    </div>
  )
}