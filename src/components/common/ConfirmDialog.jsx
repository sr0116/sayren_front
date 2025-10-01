"use client"

import { useDispatch } from "react-redux";
import { closeModal } from "@/store/modalSlice";
import Button from "@/components/common/Button";

// 작업(결제, 환불, 삭제 등) 전에 사용자에게 확인을 받는 모달
// GlobalModal의 content로 주입해서 사용
export default function ConfirmDialog({
                                        title,
                                        message,
                                        onConfirm,
                                        hideCancel = false,   // 기본값: false → 취소 버튼 보임
                                        confirmText = "확인",
                                        cancelText = "취소",
                                      }) {
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
        {message && (
            <div className="text-sm text-gray-600 whitespace-pre-line">{message}</div>
        )}

        {/* 액션 버튼 */}
        <div className="flex justify-end gap-3">
          {/* 취소 버튼 (조건부 렌더링) */}
          {!hideCancel && (
              <Button variant="outline" onClick={handleCancel}>
                {cancelText}
              </Button>
          )}

          {/* 확인 버튼 */}
          <Button variant="primary" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
  );
}
