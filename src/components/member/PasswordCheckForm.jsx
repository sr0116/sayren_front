"use client";

import React, {useState} from "react";
import {PasswordInput} from "@/components/common/Input";
import {useFormInput} from "@/hooks/useFormInput";
import Button from "@/components/common/Button";
import {useCheckPasswordMutation} from "@/api/memberApi";
import {useDispatch} from "react-redux";
import {closeModal, openModal} from "@/store/modalSlice";

export default function PasswordCheckForm({children}) {
  const [isChecked, setChecked] = useState(false);
  const {formData: passwordCheckDTO, handleChange} = useFormInput({
    password: "",
  })

  const dispatch = useDispatch();

  const checkPasswordMutation = useCheckPasswordMutation({
    onSuccess: () => {
      setChecked(true);
    },
    onError: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>비밀번호가 다릅니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)}
      ));
    }
  })

  const handleClick = (e) => {
    e.preventDefault();
    checkPasswordMutation.mutate({
      data: passwordCheckDTO ,
    })
  }

  return (
    <div className="w-full">
      {isChecked ? (
        <div>
          {children}
        </div>
      ):(
        <div className="flex gap-2 w-full">
          <PasswordInput placeholder="현재 비밀번호" name="password" value={passwordCheckDTO.password} onChange={handleChange} />
          <Button variant="primary" className="max-w-[120px]" disabled={passwordCheckDTO.password.trim().length < 8} type="button" onClick={handleClick}>비밀번호 인증</Button>
        </div>
      )}
    </div>
  )
}