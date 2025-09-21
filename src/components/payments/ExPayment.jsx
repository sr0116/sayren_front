"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function ExPayment() {
  const [loginRequestDTO, setLoginRequestDTO] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  //  로그인 API 요청 (백엔드 /api/auth/login 가정)
  const mutation = useMutation({
    mutationFn: async (dto) => {
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto),
          }
      );
      if (!res.ok) throw new Error("로그인 실패");
      return res.json();
    },
    onSuccess: (data) => {
      //  accessToken 로컬 스토리지 저장
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      alert("로그인 성공!");
    },
    onError: (err) => {
      console.error("로그인 실패:", err);
      alert("로그인 실패");
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
      <div className="w-[400px] mx-auto p-6 border bg-white my-20 rounded">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
              type="text"
              name="username"
              placeholder="아이디"
              value={loginRequestDTO.username}
              onChange={handleChange}
              className="border p-2 rounded"
          />
          <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={loginRequestDTO.password}
              onChange={handleChange}
              className="border p-2 rounded"
          />
          <label className="text-sm">
            <input
                type="checkbox"
                name="rememberMe"
                checked={loginRequestDTO.rememberMe}
                onChange={handleChange}
            />
            로그인 상태 유지
          </label>
          <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {mutation.isPending ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
  );
}
