import Button from "@/components/common/Button";
import {useAdmin2faDeleteMutation} from "@/api/memberApi";
import {closeModal, openModal} from "@/store/modalSlice";
import {queryClient} from "@/lib/queryClient";
import React from "react";
import {useDispatch} from "react-redux";

export default function Member2faDelete({memberId}){

  const dispatch = useDispatch();
  const admin2faDeleteMutation = useAdmin2faDeleteMutation({
    onSuccess: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>해당 유저의 2차 인증이 해제되었습니다.</p>
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
          <p>2차인증 해제 실패! 잠시후 다시 시도해주세요.</p>
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
    admin2faDeleteMutation.mutate({
      data: { memberId: memberId },
    })
  }

  return (
    <Button variant="outline" onClick={handleClick} className="max-w-[100px]">
      연동해제
    </Button>
  )
}