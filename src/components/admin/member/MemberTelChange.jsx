import Button from "@/components/common/Button";
import React from "react";
import TelInput from "@/components/auth/TelInput";
import {useFormInput} from "@/hooks/useFormInput";
import {useAdminTelChangeMutation} from "@/api/memberApi";
import {closeModal, openModal} from "@/store/modalSlice";
import {queryClient} from "@/lib/queryClient";
import {useDispatch} from "react-redux";

export default function MemberTelChange({tel, memberId, disabled}){
  const {formData: changeTelDTO, handleChange} = useFormInput({
    tel: tel,
    memberId: memberId
  })

  const dispatch = useDispatch();
  const adminTelChangeMutation = useAdminTelChangeMutation({
    onSuccess: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>해당 멤버의 전화번호가 변경되었습니다.</p>
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
          <p>전화번호 변경실패! 잠시후 다시 시도해주세요.</p>
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
    adminTelChangeMutation.mutate({
      data: changeTelDTO
    })
  }

  return (
      <div className="flex gap-2 w-full">
        <TelInput name="tel" value={changeTelDTO.tel || ""} onChange={handleChange} disabled={disabled} className="flex-1" />
        <Button variant="primary" onClick={handleClick} className="max-w-[100px]" disabled={tel === changeTelDTO.tel || changeTelDTO.tel.length < 11}>변경하기</Button>
      </div>
  )
}