"use client";

import {useDispatch, useSelector} from "react-redux";
import {useSocialLinkMutation, useUserSocialLinkMutation} from "@/api/authApi";
import {login} from "@/store/authSlice";
import {closeModal} from "@/store/modalSlice";
import {usePathname, useRouter} from "next/navigation";
import {PasswordInput} from "@/components/common/Input";
import {useFormInput} from "@/hooks/useFormInput";
import {queryClient} from "@/lib/queryClient";

export default function SocialLinkModal({socialUser}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((state) => state.auth.user);
  const pathname = usePathname();

  const { formData: socialLinkRequestDTO, handleChange } = useFormInput({
    socialUser: socialUser,
    password: "",
  })

  const socialLinkMutation = useSocialLinkMutation({
    onSuccess: (data) => {
      dispatch(login({ data }));
      dispatch(closeModal());

      router.push("/");

      queryClient.invalidateQueries("social-list");
    },
    onError: () => {
      alert("비밀번호가 다릅니다.");
    },
  })

  const userSocialLinkMutation = useUserSocialLinkMutation({
    onSuccess: (data) => {
      dispatch(login({ data }));
      dispatch(closeModal());
      queryClient.invalidateQueries("social-list");
    },
    onError: () => {
      alert("비밀번호가 다릅니다.");
    },
  })



  const handleClick = (e) =>{
    e.preventDefault();
    if(currentUser){
      userSocialLinkMutation.mutate({
        data: socialLinkRequestDTO,
      })
    }
    else {
      socialLinkMutation.mutate({
        data: socialLinkRequestDTO,
      })
    }
  }

  return (
    <div className="p-3">
      {/* 제목 */}
      <h2 className="text-lg font-bold text-gray-800 mb-3">계정 연동</h2>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        기존 회원이 있습니다. 연동하시려면{" "}
        <span className="font-semibold text-gray-900">
          {currentUser ? "현재 로그인한" : socialUser.email}
        </span>{" "}
        계정의 비밀번호를 입력해주세요.
      </p>

      <PasswordInput name="password" value={socialLinkRequestDTO.password} onChange={handleChange} placeholder={"비밀번호 입력"}/>

      {/* 버튼 영역 */}
      <div className="flex justify-end gap-2 pt-6">
        <button
          onClick={handleClick}
          disabled={socialLinkMutation.isPending}
          className={`px-4 py-2 rounded-lg text-white font-medium transition ${
            socialLinkMutation.isPending
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {socialLinkMutation.isPending ? "연동 중..." : "연동하기"}
        </button>
      </div>
    </div>
  );
}
