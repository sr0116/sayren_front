"use client";

import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi, googleLoginHandler, naverLoginHandler, kakaoLoginHandler, socialSignup } from "@/api/authApi";
import { login } from "@/store/authSlice";
import { TextInput, CheckBox, PasswordInput } from "@/components/common/Input";
import Button from "@/components/common/Button";
import Link from "next/link";
import SocialAuthHandler from "@/app/providers/SocialAuthHandler";

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

  // ✅ 소셜 로그인 postMessage 핸들러
  useEffect(() => {
    const handler = (event) => {
      if (event.origin !== "http://localhost:8080") return; // 보안 체크
      const data = event.data;

      if (data.accessToken) {
        dispatch(login({ accessToken: data.accessToken }));
        router.push("/");
      } else if (data.error === "SIGNUP_REQUIRED") {
        // 약관 동의 → 회원가입 처리
        // TODO: 모달 관리 Redux slice 만들어서 openModal로 교체 가능
        console.log("회원가입 필요:", data.socialUser);
      } else if (data.error === "LINK_REQUIRED") {
        // 계정 연동 처리
        console.log("계정 연동 필요:", data.socialUser);
      } else {
        console.error("소셜 로그인 실패:", data);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [dispatch, router]);

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

        <p className="text-xs text-center text-gray-500">소셜 로그인으로 간편하게 이용</p>
        <Button variant="secondary" type="button" onClick={googleLoginHandler}>
          구글 로그인
        </Button>
        <Button variant="secondary" type="button" onClick={naverLoginHandler}>
          네이버 로그인
        </Button>
        <Button variant="secondary" type="button" onClick={kakaoLoginHandler}>
          카카오 로그인
        </Button>
      </form>

      <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
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
