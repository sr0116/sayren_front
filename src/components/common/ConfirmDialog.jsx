"use client"

import {useDispatch} from "react-redux";
import {closeModal} from "@/store/modalSlice";
import LogoutButton from "@/components/common/Button";
import Button from "@/components/common/Button";

// 작업(결제, 환불, 삭제 등) 전에 사용자에게 확인을 받는 모달
// GlobalModal의 content로 주입해서 사용
export default function ConfirmDialog({ title, message, onConfirm }) {
  const dispatch = useDispatch();

  // 확인 버튼 클릭 시 → 콜백 실행 후 모달 닫기
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    dispatch(closeModal());
  };

  // 취소 버튼 클릭 시 → 모달 닫기만
  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
      <div className="space-y-5">
        {/* 모달 제목 */}
        {title && <h2 className="text-lg font-semibold">{title}</h2>}

        {/* 안내 메시지 */}
        {message && <p className="text-sm text-gray-600">{message}</p>}

        {/* 액션 버튼 */}
        <div className="flex justify-end gap-3">
          {/* 취소 버튼 (outline 스타일) */}
          <Button variant="outline" onClick={handleCancel}>
            취소
          </Button>

          {/* 확인 버튼 (primary 스타일) */}
          <Button variant="primary" onClick={handleConfirm}>
            확인
          </Button>
        </div>
      </div>
  );
}