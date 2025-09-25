"use client";

import TelCheckForm from "@/components/auth/TelCheckForm";
import React, {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {useFindIdMutation} from "@/api/memberApi";
import {useDispatch} from "react-redux";
import {closeModal, openModal} from "@/store/modalSlice";
import Button from "@/components/common/Button";

export default function FindIdForm(){
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const findIdMutation = useFindIdMutation({
    onSuccess:() => {
      setCheck(true);
    },
    onError:() => {
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
    }
  })



  return(
      <div>
        {check? (
            <div/>
        ) : (
          <TelCheckForm col={true} mutation={findIdMutation}/>
        )}
      </div>
    )
}