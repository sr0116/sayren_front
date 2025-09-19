import {TextInput, CheckBox, PasswordInput} from "@/components/common/Input";
import {open} from "@/store/modalSlice";
import Button from "@/components/common/Button";
import Link from "next/link";

export default function LoginPage(){
  return (
      <div className="w-[400px] mx-auto rounded-lg p-6 border border-gray-200 bg-white my-20">
        <form className="flex flex-col gap-3">
          <TextInput placeholder={"아이디 또는 전화번호"} name={"username"} autoComplete={"email"}/>
          <PasswordInput placeholder={"비밀번호"} name={"password"}/>
          <CheckBox label={"로그인 상태 유지"}/>
          <Button variant={"primary"}>
            로그인
          </Button>

          <p className="text-xs text-center text-gray-500">
            소셜 로그인으로 간편하게 이용
          </p>
          <Button variant={"secondary"} type={"button"}>
            구글 로그인
          </Button>          
          <Button variant={"secondary"} type={"button"}>
            네이버 로그인
          </Button>
          <Button variant={"secondary"} type={"button"}>
            카카오 로그인
          </Button>
        </form>

        <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
          <Link href={"/"} className="hover:underline">
            회원가입
          </Link>
          <Link href={"/"} className="hover:underline">
            아이디 찾기
          </Link>
          <Link href={"/"} className="hover:underline">
            비밀번호 찾기
          </Link>
        </div>
      </div>
  );
}