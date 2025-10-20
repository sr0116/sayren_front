"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { userSubscribeOptions } from "@/utils/enumOptions";

/**
 * 구독 취소 시 사용자 사유 선택 폼
 * - forwardRef 로 부모(ConfirmDialog)에서 선택값 참조
 */
const SubscribeCancelForm = forwardRef((props, ref) => {
  const [selectedReason, setSelectedReason] = useState("USER_REQUEST");

  useImperativeHandle(ref, () => ({
    getSelectedReason: () => selectedReason,
  }));

  const reasonOptions = userSubscribeOptions.flatMap((group) => group.options);

  return (
      <div className="space-y-3">
        <p className="text-sm text-gray-700">
          정말 이 구독을 취소하시겠습니까?
        </p>

        <label className="block text-sm font-medium text-gray-600">
          취소 사유 선택
        </label>

        <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-1 focus:ring-gray-400 focus:outline-none"
        >
          {reasonOptions.map((opt) => (
              <option key={opt.reasonCode} value={opt.reasonCode}>
                {opt.label}
              </option>
          ))}
        </select>
      </div>
  );
});

SubscribeCancelForm.displayName = "SubscribeCancelForm";
export default SubscribeCancelForm;
