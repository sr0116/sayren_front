"use client";
import Link from "next/link";
import {useLogoutMutation} from "@/api/authApi";
import { logout } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {closeModal, openModal} from "@/store/modalSlice";
import Button from "@/components/common/Button";
import React from "react";

// 로그인 여부에 따라 표시되는 영역
// isAuthenticated=true → 사용자 이름 + 마이페이지 + 로그아웃
// isAuthenticated=false → 로그인 + 회원가입

export default function AuthNav({ isAuthenticated, user }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    logoutMutation.mutate();
  }

  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      dispatch(logout());
      router.push("/");
    },
    onError: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-4">
          <p>서버에 오류가 있습니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)
      }))
    }
  });

  return isAuthenticated ? (
      <div className="space-x-5 flex items-center text-sm">
        <p>
          <strong>{user?.name}님</strong> 안녕하세요
        </p>
        <Link href="/mypage" className="hover:underline">
          마이페이지
        </Link>
        <button
            onClick={handleClick}
            className="text-sm text-gray-600 hover:underline cursor-pointer"
        >
          로그아웃
        </button>
      </div>
  ) : (
      <div className="space-x-5 text-sm">
        <Link href="/member/login" className="hover:underline">
          로그인
        </Link>
        <Link href="/member/signup" className="hover:underline">
          회원가입
        </Link>
      </div>
  );
}