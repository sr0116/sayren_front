"use client";
import Link from "next/link";
import LogoutButton from "@/components/common/LogoutButton";


// 로그인 여부에 따라 표시되는 영역
// isAuthenticated=true → 사용자 이름 + 마이페이지 + 로그아웃
// isAuthenticated=false → 로그인 + 회원가입

export default function AuthNav({ isAuthenticated, user }) {
  return isAuthenticated ? (
      <div className="space-x-5 flex items-center">
        <p>
          <strong>{user?.name}님</strong> 안녕하세요
        </p>
        <Link href="/mypage">마이페이지</Link>
        <LogoutButton /> {/* 내부에서 Button 사용 */}
      </div>
  ) : (
      <div className="space-x-5">
        <Link href="/member/login">로그인</Link>
        <Link href="/member/signup">회원가입</Link>
      </div>
  );
}
