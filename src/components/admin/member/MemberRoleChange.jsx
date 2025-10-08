import Button from "@/components/common/Button";
import React from "react";
import {TextInput} from "@/components/common/Input";
import {useAdminRoleChangeMutation} from "@/api/memberApi";
import {useDispatch} from "react-redux";
import {closeModal, openModal} from "@/store/modalSlice";
import {queryClient} from "@/lib/queryClient";

export default function MemberRoleChange({roles, memberId, disabled}){

  const role = roles.join(", ");
  const dispatch = useDispatch();
  const adminRoleChangeMutation = useAdminRoleChangeMutation({
    onSuccess: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>해당 멤버의 권한이 변경되었습니다.</p>
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
          <p>권한 변경실패! 잠시후 다시 시도해주세요.</p>
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
    adminRoleChangeMutation.mutate({
      data: { memberId: memberId },
    })
  }
  
  return (
      <div className="flex gap-2 w-full">
        <TextInput name="roles" value={role} className="flex-1" disabled={true}/>
        <Button disabled={disabled} variant="primary" onClick={handleClick} className="max-w-[100px]">{roles.includes("ADMIN") ? "권한 해제" : "권한 부여"}</Button>
      </div>
  )
}