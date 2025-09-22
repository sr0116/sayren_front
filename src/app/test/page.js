"use client";
import { useDispatch } from "react-redux";
import {openModal} from "@/store/modalSlice";
import Button from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";

export default function Page() {
  const dispatch = useDispatch();
  const handleOpenConfirm = () => {
    dispatch(
        openModal({
          content: (
              <ConfirmDialog
                  title="환불 요청"
                  message="정말 이 결제를 환불 요청하시겠습니까?"
                  onConfirm={() => {
                    console.log("환불 처리 실행됨");
                  }}
              />
          ),
        })
    );
  };

  return (
      <div className="flex flex-col gap-4 p-6">
        {/* 단순 텍스트 모달 열기 */}
        <Button
            variant="primary"
            onClick={() =>
                dispatch(openModal({ content: <p className="text-center">안녕 세이렌</p> }))
            }
        >
          모달 열기 (텍스트)
        </Button>

        <Button
            variant="secondary"
            onClick={() =>
                dispatch(openModal({ content: <p className="text-center">안녕 상현아 👋</p> }))
            }
        >
          모달 열기 (텍스트)
        </Button>

        <Button
            variant="outline"
            onClick={() =>
                dispatch(openModal({ content: <p className="text-center">ㅋㅋ 👋</p> }))
            }
        >
          모달 열기 (텍스트)
        </Button>

        {/* ConfirmDialog 모달 열기 */}
        <Button variant="primary" onClick={handleOpenConfirm}>
          모달 열기 (ConfirmDialog)
        </Button>
      </div>
  );
}
