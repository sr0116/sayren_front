import {TextInput} from "@/components/common/Input";
import React from "react";
import Button from "@/components/common/Button";
import {useFormInput} from "@/hooks/useFormInput";

export default function MemberNameChange({name, memberId}){
  const {formData: changeNameDTO, handleChange} = useFormInput({
    name: name,
    memberId: memberId
  })

  return (
      <div className="flex gap-2 w-full">
        <TextInput name="name" value={changeNameDTO.name} onChange={handleChange} className="flex-1" />
        <Button variant="primary" className="max-w-[100px]" disabled={name === changeNameDTO.name || changeNameDTO.name.length < 2}>변경하기</Button>
      </div>
  )
}