import {useFormInput} from "@/hooks/useFormInput";
import Button from "@/components/common/Button";
import React from "react";
import Select from "@/components/common/Select";

export default function MemberStatusChange({status, memberId}) {
  const {formData: changeStatusDTO, handleChange} = useFormInput({
    status: status,
    memberId: memberId
  })

  return (
      <div className="flex gap-2 w-full">
        <Select name="status" value={changeStatusDTO.status} onChange={handleChange} className="flex-1">
          <option value="READY">READY</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="DISABLED">DISABLED</option>
          <option value="DELETE">DELETE</option>
        </Select>
        <Button variant="primary" className="max-w-[100px]" disabled={status === changeStatusDTO.status}>{changeStatusDTO.status === "DELETE" ? "삭제하기" : "변경하기"}</Button>
      </div>
  )
}