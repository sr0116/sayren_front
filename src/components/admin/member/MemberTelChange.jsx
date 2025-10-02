import Button from "@/components/common/Button";
import React from "react";
import TelInput from "@/components/auth/TelInput";
import {useFormInput} from "@/hooks/useFormInput";

export default function MemberTelChange({tel, memberId}){
  const {formData: changeTelDTO, handleChange} = useFormInput({
    tel: tel,
    memberId: memberId
  })

  return (
      <div className="flex gap-2 w-full">
        <TelInput name="tel" value={changeTelDTO.tel || ""} onChange={handleChange} className="flex-1" />
        <Button variant="primary" className="max-w-[100px]" disabled={tel === changeTelDTO.tel || changeTelDTO.tel.length < 11}>변경하기</Button>
      </div>
  )
}