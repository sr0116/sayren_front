"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socialLink } from "@/api/authApi";
import { login } from "@/store/authSlice";
import { closeModal } from "@/store/modalSlice";
import { useRouter } from "next/navigation";

export default function SocialLinkModal({ socialUser }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((s) => s.auth.user);

  const handleLink = async () => {
    try {
      setLoading(true);
      const result = await socialLink({
        socialUser,
        password,
      });

      if (result?.accessToken) {
        dispatch(login({ accessToken: result.accessToken }));
        dispatch(closeModal());
        router.push("/");
      }
    } catch (err) {
      const { message } = err.response?.data || {};
      alert(message || "계정 연동에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[420px] bg-white rounded-xl shadow-xl p-6">
      {/* 제목 */}
      <h2 className="text-lg font-bold text-gray-800 mb-3">계정 연동</h2>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        기존 회원이 있습니다. 연동하시려면{" "}
        <span className="font-semibold text-gray-900">
          {currentUser?.email ?? socialUser.email}
        </span>{" "}
        계정의 비밀번호를 입력해주세요.
      </p>

      {/* 비밀번호 입력 */}
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
      />

      {/* 버튼 영역 */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => dispatch(closeModal())}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          닫기
        </button>
        <button
          onClick={handleLink}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "연동 중..." : "연동하기"}
        </button>
      </div>
    </div>
  );
}
