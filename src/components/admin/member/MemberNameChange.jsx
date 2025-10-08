import {TextInput} from "@/components/common/Input";
import React from "react";
import Button from "@/components/common/Button";
import {useFormInput} from "@/hooks/useFormInput";
import {useAdminNameChangeMutation} from "@/api/memberApi";
import {useDispatch} from "react-redux";
import {closeModal, openModal} from "@/store/modalSlice";
import {queryClient} from "@/lib/queryClient";

export default function MemberNameChange({name, memberId, disabled}){
  const {formData: changeNameDTO, handleChange} = useFormInput({
    name: name,
    memberId: memberId
  })
  const dispatch = useDispatch();
  const adminNameChangeMutation = useAdminNameChangeMutation({
    onSuccess: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>해당 멤버의 이름이 변경되었습니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)
      }))
      queryClient.invalidateQueries({
        queryKey: ["member-info", memberId],
      });
    },
    onError: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>이름 변경 실패! 잠시후 다시 시도해 주세요.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)
      }))
    }
  })

  const handleClick = (e) => {
    e.preventDefault();
    adminNameChangeMutation.mutate({
      data: changeNameDTO
    })
  }

  return (
      <div className="flex gap-2 w-full">
        <TextInput name="name" value={changeNameDTO.name} onChange={handleChange} disabled={disabled} className="flex-1" />
        <Button variant="primary" className="max-w-[100px]" onClick={handleClick} disabled={name === changeNameDTO.name || changeNameDTO.name.length < 2}>변경하기</Button>
      </div>
  )
}