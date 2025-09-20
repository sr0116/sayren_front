"use client";

import {SiKakaotalk, SiNaver} from "react-icons/si";
import {FcGoogle} from "react-icons/fc";
import { googleLoginHandler, naverLoginHandler, kakaoLoginHandler } from "@/api/authApi";

export default function SocialLoginButton({text = "로그인"}) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto text-sm">
      <button
        className="relative flex items-center justify-center bg-[#03C75A] text-white py-2 rounded-md font-medium hover:brightness-95 cursor-pointer"
        onClick={naverLoginHandler}
        type="button"
      >
        <span className="absolute left-4">
          <SiNaver size={20} />
        </span>
        네이버로 {text}
      </button>

      <button
        className="relative flex items-center justify-center bg-[#FEE500] text-[#3C1E1E] py-2 rounded-md font-medium hover:brightness-95 cursor-pointer"
        onClick={kakaoLoginHandler}
        type="button"
      >
        <span className="absolute left-4">
          <SiKakaotalk size={20} />
        </span>
        카카오톡으로 {text}
      </button>

      <button
        className="relative flex items-center justify-center border border-gray-300 bg-white py-2 rounded-md font-medium hover:bg-gray-100 cursor-pointer"
        onClick={googleLoginHandler}
        type="button"
      >
        <span className="absolute left-4">
          <FcGoogle size={20} />
        </span>
        구글로 {text}
      </button>
    </div>
  )
}