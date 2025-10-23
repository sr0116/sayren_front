"use client";

import {useFormInput} from "@/hooks/useFormInput";
import {TextInput} from "@/components/common/Input";
import Button from "@/components/common/Button";
import {useFindPwMutation} from "@/api/memberApi";
import {closeModal, openModal} from "@/store/modalSlice";
import React from "react";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

export default function FindPwForm(){
  const { formData : findPasswordRequestDTO , handleChange } = useFormInput({
    email: "",
  })

  const dispatch = useDispatch();
  const router = useRouter();

  const findPwMutation = useFindPwMutation({
    onSuccess: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>{findPasswordRequestDTO.email}로 비밀번호 재설정 링크를 보냈습니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)
      }))
      router.push("/");
    },
    onError: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>해당 메일로 등록된 유저가 없습니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)
      }))
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    findPwMutation.mutate({
      data: findPasswordRequestDTO
    })
  }

  return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput name="email" value={findPasswordRequestDTO.email} onChange={handleChange} autoComplete="email" placeholder="이메일"/>
        <Button variant="primary" disabled={findPasswordRequestDTO.email.trim().length <= 0} type="submit">
          비밀번호 찾기
        </Button>
      </form>
  )
}