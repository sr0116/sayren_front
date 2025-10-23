"use client";

import { useDispatch } from "react-redux";
import { closeModal } from "@/store/modalSlice";
import Button from "@/components/common/Button";

export default function ConfirmDialog({
                                        title,
                                        message,
                                        onConfirm,
                                        onCancel,           // 추가
                                        hideCancel = false,
                                        confirmText = "확인",
                                        cancelText = "취소",
                                      }) {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    dispatch(closeModal());
  };

  const handleCancel = () => {
    if (onCancel) onCancel();   //  취소 시 동작 추가
    dispatch(closeModal());
  };

  return (
      <div className="space-y-5">
        {title && <h2 className="text-lg font-semibold">{title}</h2>}
        {message && (
            <div className="text-sm text-gray-600 whitespace-pre-line">{message}</div>
        )}

        <div className="flex justify-end gap-3">
          {!hideCancel && (
              <Button variant="outline" onClick={handleCancel}>
                {cancelText}
              </Button>
          )}
          <Button variant="primary" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
  );
}
