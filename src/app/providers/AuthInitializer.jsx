"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "@/store/authSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const hasActiveFlag = document.cookie.includes("SR_ACTIVE");
    if (!hasActiveFlag) {
      dispatch(logout());
      return;
    }

    (async () => {
      try {
        // ✅ 프록시 경유로 Spring Boot API 호출
        const res = await fetch("/api/proxy/api/auth/me", {
          method: "GET",
          credentials: "include", // SR_ACCESS 같은 HttpOnly 쿠키 자동 포함
        });

        if (res.ok) {
          const member = await res.json();
          dispatch(login({ data: member }));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        console.error("유저 조회 실패:", err);
        dispatch(logout());
      }
    })();
  }, [dispatch]);

  return null; // UI 없음 → 초기화 전용
}
