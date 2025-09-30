"use client";

import React, {useEffect, useState} from "react";
import {PasswordInput} from "@/components/common/Input";
import {useFormInput} from "@/hooks/useFormInput";
import Button from "@/components/common/Button";
import {useCheckPasswordMutation} from "@/api/memberApi";
import {useDispatch} from "react-redux";
import {closeModal, openModal} from "@/store/modalSlice";
import {useApiQuery} from "@/hooks/useApi";
import {useSrCheck} from "@/hooks/useSrCheck";

export default function PasswordCheckForm({children}) {
  const [isChecked, setChecked] = useSrCheck();
  const {formData: passwordCheckDTO, handleChange} = useFormInput({
    password: "",
  })

  const { data, isLoading, isError } = useApiQuery(
      ["has-pw"],
      "/api/user/member/has-pw",
      {
        options: {
          // 캐싱은 페이지 새로고침 동안만 (메모리 캐시)
          cacheTime: 0,
          // 데이터는 무조건 fresh로 취급 → 컴포넌트 리마운트 시 refetch 안 함
          staleTime: Infinity,
          // 창 이동, 포커스 시에도 재요청 안 함
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          refetchOnMount: false,
        },
      }
  );


  useEffect(() => {
    if(data && data.result === false){
      setChecked(true);
    }
  }, [data, setChecked]);

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

  if(isLoading) return <div>확인중</div>;
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