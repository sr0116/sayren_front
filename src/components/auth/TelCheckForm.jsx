"use client";

import {useFormInput} from "@/hooks/useFormInput";
import {NumberInput, TextInput} from "@/components/common/Input";
import TelInput from "@/components/auth/TelInput";
import Button from "@/components/common/Button";
import {useApiMutation} from "@/hooks/useApi";
import {closeModal, openModal} from "@/store/modalSlice";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

export default function TelCheckForm({mutation, col}){
  const { formData : memberTelDTO , handleChange } = useFormInput({
    tel: "",
    phoneAuthCode: "",
  })
  const dispatch = useDispatch();

  const [cooldown, setCooldown] = useState(0);

  // 1초마다 cooldown 줄이기
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const telSendMutation = useApiMutation("POST", "/api/user/member/send-tel" + `?tel=${memberTelDTO.tel}`, {
    options: {
      onSuccess: () => {
        dispatch(openModal({
          content: (<div className="flex flex-col justify-center items-center gap-2">
            <p>핸드폰 번호로 인증문자가 발송되었습니다.</p>
            <Button variant={"primary"} onClick={() => {
              dispatch(closeModal());
            }}>
              확인
            </Button>
          </div>)}
        ));
        setCooldown(300);
      },
      onError: (err) => {
        dispatch(openModal({
          content: (<div className="flex flex-col justify-center items-center gap-2">
            <p>인증번호 전송에 실패했습니다. 다시 시도해주세요.</p>
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

  const sendHandler = () => {
    telSendMutation.mutate()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      data: memberTelDTO
    })
  }


  return (
      <form className="flex-col flex gap-4" onSubmit={handleSubmit}>
        <div className={"flex gap-2 " + (col && "flex-col")}>
          <TelInput name="tel" value={memberTelDTO.tel} onChange={handleChange} disabled={cooldown > 0}/>
          <div className={col ? "" : "w-[120px]"}>
            <Button variant={"primary"} type="button" disabled={cooldown > 0 || memberTelDTO.tel.length < 11 } onClick={sendHandler}>인증번호 발송</Button>
          </div>
        </div>
        {cooldown > 0 && (
          <div className="flex gap-2 h-[48px]">
            <NumberInput name="phoneAuthCode" value={memberTelDTO.phoneAuthCode} onChange={handleChange} placeholder={"인증번호입력"}/>
            <div className="w-[120px] flex-shrink-0">
              <Button variant={"primary"} type="submit">인증하기</Button>
            </div>
          </div>
        )}
      </form>
  );
}