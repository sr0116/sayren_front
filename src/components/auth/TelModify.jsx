"use client";

import TelCheckForm from "@/components/auth/TelCheckForm";
import {useApiMutation} from "@/hooks/useApi";
import {closeModal, openModal} from "@/store/modalSlice";
import Button from "@/components/common/Button";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import TelInfo from "@/components/member/TelInfo";

export default function TelModify(){
  const dispatch = useDispatch();
  const router = useRouter();

  const {user} = useSelector((state) => state.auth);


  const telmodifyMutation = useApiMutation("POST", "/api/user/member/modify-tel", {
    options: {
      onSuccess: () => {
        dispatch(openModal({
          content: (<div className="flex flex-col justify-center items-center gap-2">
            <p>핸드폰 번호 수정이 완료되었습니다.</p>
            <Button variant={"primary"} onClick={() => {
              dispatch(closeModal());
            }}>
              확인
            </Button>
          </div>)}
        ));
        router.push("/mypage");
      },
      onError: (err) => {
        dispatch(openModal({
          content: (<div className="flex flex-col justify-center items-center gap-2">
            <p>정확한 인증번호를 입력해주세요.</p>
            <Button variant={"primary"} onClick={() => {
              dispatch(closeModal());
            }}>
              확인
            </Button>
          </div>)
        }))
      },
    },
  });


  return(
      <div>
        {user?.status === "ACTIVE" && <TelInfo />}
        <p className="font-semibold text-gray-600 mb-4">휴대폰 번호 수정</p>
        <TelCheckForm mutation={telmodifyMutation}/>
      </div>
  )
}