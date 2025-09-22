"use client";

import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import { logout as logoutApi } from "@/api/authApi";
import { logout } from "@/store/authSlice";


export default function Button({
                                 children,
                                 variant = "primary",
                                 type = "submit",
                                 onClick,
                                 className = "",
                                 disabled = false,
                               }) {
  const base =
      "w-full py-3 rounded-md font-semi-bold transition focus:outline-none disabled:bg-gray-300 cursor-pointer";

  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-700", // 메인 버튼
    secondary: "bg-gray-500 text-white hover:bg-gray-700", // 회색 버튼
    outline: "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white", // 테두리 버튼
  };

  return (
      <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`${base} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
  );
}

export function LogoutButton({children}) {
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

    <label className="cursor-pointer">
      {children}
      <button onClick={handleLogout} className="px-4 py-2 bg-gray-200 rounded hidden">
        로그아웃
      </button>
    </label>
  );
}