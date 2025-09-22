"use client";

import { logout as logoutApi } from "@/api/authApi";
import { logout } from "@/store/authSlice";
import Button from "@/components/common/Button";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

export default function LogoutButton({ children = "로그아웃" }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    const ok = await logoutApi();
    if (ok) {
      dispatch(logout());
      router.push("/member/login");
    }
  };

  return (
      <Button variant="outline" onClick={handleLogout}>
        {children}
      </Button>
  );
}
