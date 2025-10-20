"use client";

import Button from "@/components/common/Button";
import {useFormInput} from "@/hooks/useFormInput";
import {CheckBox} from "@/components/common/Input";
import {useDeleteMemberMutation} from "@/api/memberApi";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {closeModal, openModal} from "@/store/modalSlice";
import React from "react";
import {logout} from "@/store/authSlice";
import {queryClient} from "@/lib/queryClient";
export default function DeleteMember(){
  const {formData: check, setFormData: setCheck, handleChange} = useFormInput({
    checkOne : false,
    checkTwo : false,
    checkThree : false,
    checkFour : false,
  })
  const router = useRouter();
  const dispatch = useDispatch();
  const deleteMemberMutation = useDeleteMemberMutation({
    onSuccess: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>회원 탈퇴가 정상적으로 처리되었습니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)}
      ));
      dispatch(logout());
      router.push("/");
      queryClient.removeQueries({ queryKey: ["sr-check"] });
      queryClient.removeQueries({ queryKey: ["2fa"] });
      queryClient.removeQueries({ queryKey: ["2fa-check"] });
      queryClient.removeQueries({ queryKey: ["2faqr"] });
    },
    onError: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>구독 중인 상품이 있어, 탈퇴처리가 어렵습니다. 구독 해제 후 다시 시도해주세요.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)}
      ));
      setCheck({
        checkOne : false,
        checkTwo : false,
        checkThree : false,
        checkFour : false
      })
    }
  })
  const handleDelete = () => {
    deleteMemberMutation.mutate();
  }

  return (
    <div className="max-w-[400px] mx-auto mt-4">
      <div className="mb-8 flex flex-col gap-3">
        <p className="font-semibold text-xl mb-4">모든 항목에 동의가 필요합니다.</p>
        <CheckBox label={"1. 구독 기간에는 탈퇴하실 수 없습니다."} name="checkOne" checked={check.checkOne} onChange={handleChange}/>
        <CheckBox label={"2. 탈퇴 시 복구가 불가능합니다."} name="checkTwo" checked={check.checkTwo} onChange={handleChange}/>
        <CheckBox label={"3. 탈퇴 후 동일한 이메일으로 30일동안 가입하실 수 없습니다."} name="checkThree" checked={check.checkThree} onChange={handleChange}/>
        <CheckBox label={"4. 신중히 고려하신 후 탈퇴 부탁드립니다."} name="checkFour" checked={check.checkFour} onChange={handleChange}/>
      </div>
      <Button variant="primary" onClick={handleDelete} disabled={!(check.checkOne && check.checkTwo && check.checkThree && check.checkFour)}>회원 탈퇴</Button>
    </div>
  )
}