"use client";
import Link from "next/link";
import { logout as logoutApi } from "@/api/authApi";
import { logout } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

// 로그인 여부에 따라 표시되는 영역
// isAuthenticated=true → 사용자 이름 + 마이페이지 + 로그아웃
// isAuthenticated=false → 로그인 + 회원가입

export default function AuthNav({ isAuthenticated, user }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    const ok = await logoutApi();
    if (ok) {
      dispatch(logout());
      router.push("/");
    }
  };

  return isAuthenticated ? (
      <div className="space-x-5 flex items-center text-sm">
        <p>
          <strong>{user?.name}님</strong> 안녕하세요
        </p>
        <Link href="/mypage" className="hover:underline">
          마이페이지
        </Link>
        <button
            onClick={handleLogout}
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