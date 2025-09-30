"use client";

import {CheckBox, PasswordInput, TextInput} from "@/components/common/Input";
import Button from "@/components/common/Button";
import SocialLoginButton from "@/components/auth/SocialLoginButton";
import React from "react";
import {useFormInput} from "@/hooks/useFormInput";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {useLoginMutation} from "@/api/authApi";
import {login} from "@/store/authSlice";
import {closeModal, openModal} from "@/store/modalSlice";
import {queryClient} from "@/lib/queryClient";
import {api} from "@/lib/axios";

export default function LoginForm(){
  const { formData: loginRequestDTO, handleChange } = useFormInput({
    username: "",
    password: "",
    rememberMe: false,
  })

  const router = useRouter();
  const dispatch = useDispatch();


  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      dispatch(login({ data }));
      queryClient
          .fetchQuery({
            queryKey: ["2fa"],
            queryFn: () => api.get("/api/auth/read-2fa"),
          })
          .then(() => {
            queryClient.setQueryData(["2fa"], true);
          })
          .catch(() => {
            queryClient.setQueryData(["2fa"], false);
          });
      router.push("/");
    },
    onError: (err) => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-4">
          <p>{err.response?.data?.message}</p>
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
    loginMutation.mutate({
      data: loginRequestDTO
    });
  };

  return(
    <div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <TextInput
            placeholder="아이디 또는 전화번호"
            name="username"
            autoComplete="email"
            value={loginRequestDTO.username}
            onChange={handleChange}
        />
        <PasswordInput
            placeholder="비밀번호"
            name="password"
            value={loginRequestDTO.password}
            onChange={handleChange}
        />
        <CheckBox
            label="로그인 상태 유지"
            name="rememberMe"
            checked={loginRequestDTO.rememberMe}
            onChange={handleChange}
        />
        <Button variant="primary" type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "로그인 중..." : "로그인"}
        </Button>

        <p className="text-xs text-center text-gray-500">
          소셜 로그인으로 간편하게 이용
        </p>
        <SocialLoginButton />
      </form>


    </div>
  )
}