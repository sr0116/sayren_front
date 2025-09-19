"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshAccessToken } from "@/api/authApi";
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
      const data = await refreshAccessToken();
      if (data?.accessToken) {
        dispatch(login({ accessToken: data.accessToken }));
      } else {
        dispatch(logout());
      }
    })();
  }, [dispatch]);

  return null; // UI는 없음 → 초기화만 담당
}
