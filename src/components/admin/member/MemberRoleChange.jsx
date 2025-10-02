import Button from "@/components/common/Button";
import React from "react";
import {TextInput} from "@/components/common/Input";

export default function MemberRoleChange({roles, memberId}){

  const role = roles.join(", ");
  
  return (
      <div className="flex gap-2 w-full">
        <TextInput name="roles" value={role} className="flex-1" disabled={true}/>
        <Button variant={roles.includes("ADMIN") ? "primary" : "outline"} className="max-w-[100px]">{roles.includes("ADMIN") ? "권한 해제" : "권한 부여"}</Button>
      </div>
  )
}