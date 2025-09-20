"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "@/api/authApi";
import { login } from "@/store/authSlice";
import { TextInput, CheckBox, PasswordInput } from "@/components/common/Input";
import Button from "@/components/common/Button";
import Link from "next/link";
import SocialAuthHandler from "@/app/providers/SocialAuthHandler";
import SocialLoginButton from "@/components/auth/SocialLoginButton";

export default function LoginPage() {
  const [loginRequestDTO, setLoginRequestDTO] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ 일반 로그인 mutation
  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      dispatch(login({ accessToken: data.accessToken }));
      router.push("/");
    },
    onError: (err) => {
      console.error("로그인 실패:", err);
    },
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setLoginRequestDTO((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(loginRequestDTO);
  };

  return (
    <div className="w-[400px] mx-auto rounded-lg p-6 border border-gray-200 bg-white my-20">
      <SocialAuthHandler />

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
        <Button variant="primary" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "로그인 중..." : "로그인"}
        </Button>

        {mutation.isError && (
          <p className="text-red-500 text-sm">
            로그인 실패: {mutation.error.message}
          </p>
        )}

        <p className="text-xs text-center text-gray-500">
          소셜 로그인으로 간편하게 이용
        </p>
        <SocialLoginButton />
      </form>

      <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
        <Link href="/member/signup" className="hover:underline">
          회원가입
        </Link>
        <Link href="/" className="hover:underline">
          아이디 찾기
        </Link>
        <Link href="/" className="hover:underline">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}
