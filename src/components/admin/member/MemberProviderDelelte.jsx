import Button from "@/components/common/Button";
import {useAdminProviderDeleteMutation} from "@/api/memberApi";
import {closeModal, openModal} from "@/store/modalSlice";
import {queryClient} from "@/lib/queryClient";
import React from "react";
import {useDispatch} from "react-redux";

export default function MemberProviderDelelte({provider, memberId}) {

  const dispatch = useDispatch();
  const adminProviderDeleteMutation = useAdminProviderDeleteMutation({
    onSuccess: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>해당 유저의 {provider} 연동이 해제되었습니다.</p>
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
          <p>비밀번호가 없는 계정의 마지막 연동정보는 해제가 불가능합니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)
      }))
    }
  });

  const handleClick = (e) => {
    e.preventDefault();
    adminProviderDeleteMutation.mutate({
      data: {provider: provider, memberId: memberId},
    })
  }

  return (
      <Button variant="outline" className="max-w-[100px]" onClick={handleClick}>
        연동해제
      </Button>
  )
}