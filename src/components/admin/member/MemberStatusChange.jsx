import {useFormInput} from "@/hooks/useFormInput";
import Button from "@/components/common/Button";
import React from "react";
import Select from "@/components/common/Select";
import {useAdminStatusChangeMutation} from "@/api/memberApi";
import {closeModal, openModal} from "@/store/modalSlice";
import {queryClient} from "@/lib/queryClient";
import {useDispatch} from "react-redux";

export default function MemberStatusChange({status, memberId, disabled}) {
  const {formData: changeStatusDTO, handleChange} = useFormInput({
    status: status,
    memberId: memberId
  })

  const dispatch = useDispatch();
  const adminStatusChangeMutation = useAdminStatusChangeMutation({
    onSuccess: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>해당 멤버의 상태가 {changeStatusDTO.status}로 변경되었습니다.</p>
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
          <p>상태 변경 실패! 잠시후 다시 시도해주세요.</p>
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
    if(changeStatusDTO.status === "DELETED" && !confirm("해당 유저가 삭제됩니다. 주의바랍니다.")){
      return false;
    }
    else if(changeStatusDTO.status === "DISABLED" && !confirm("해당 유저의 이용이 중지됩니다. 주의바랍니다.")){
      return false;
    }
    else if(changeStatusDTO.status === "READY" && !confirm("해당 유저의 핸드폰 인증이 만료됩니다. 주의바랍니다.")){
      return false;
    }
    adminStatusChangeMutation.mutate({
      data: changeStatusDTO
    })
  }

  return (
      <div className="flex gap-2 w-full">
        <Select name="status" value={changeStatusDTO.status} onChange={handleChange} className="flex-1" disabled={disabled}>
          <option value="READY">READY</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="DISABLED">DISABLED</option>
          <option value="DELETED">DELETED</option>
        </Select>
        <Button onClick={handleClick} variant="primary" className="max-w-[100px]" disabled={status === changeStatusDTO.status || status === "DELETED"}>{changeStatusDTO.status === "DELETE" ? "삭제하기" : "변경하기"}</Button>
      </div>
  )
}