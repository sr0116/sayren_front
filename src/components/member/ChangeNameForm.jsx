"use client";

import {useDispatch, useSelector} from "react-redux";
import {TextInput} from "@/components/common/Input";
import {useFormInput} from "@/hooks/useFormInput";
import React, {useEffect} from "react";
import Button from "@/components/common/Button";
import {useChangeNameMutation} from "@/api/memberApi";
import {login} from "@/store/authSlice";
import {closeModal, openModal} from "@/store/modalSlice";

export default function ChangeNameForm() {
  const {user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const {formData: nameDTO,setFormData: setNameDTO, handleChange} = useFormInput({
    name: "",
  })

  useEffect(() => {
    setNameDTO({name: user?.name});
  }, [user])

  const changeNameMutation = useChangeNameMutation({
    onSuccess: (data) => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-4">
          <p>이름이 변경되었습니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)
      }))
      dispatch(login({ data }));
    },
    onError: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-4">
          <p>이름 변경에 실패했습니다.</p>
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
    changeNameMutation.mutate({
      data: nameDTO
    })
  }


  return (
    <div>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <TextInput name="name" placeholder={"이름"} value={nameDTO.name} onChange={handleChange} autoComplete="name"/>
        <Button variant="primary" type="submit" className="max-w-[120px]" disabled={nameDTO.name === user?.name || nameDTO.name.trim().length < 2}>변경하기</Button>
      </form>
    </div>
  )
}