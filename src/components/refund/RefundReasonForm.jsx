"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { getEnumOptions } from "@/utils/enumOptions";

// forwardRef로 상위 컴포넌트에서 선택된 값 읽기 가능
const RefundReasonForm = forwardRef((props, ref) => {
  const [reason, setReason] = useState("USER_REQUEST");
  const reasonOptions = getEnumOptions("ReasonCode");

  // 상위에서 읽을 수 있게 노출
  useImperativeHandle(ref, () => ({
    getSelectedReason: () => reason,
  }));

  return (
      <div className="space-y-3">
        <p>이 결제 건에 대해 환불을 요청하시겠습니까?</p>
        <label className="block text-sm font-medium">환불 사유 선택</label>
        <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border rounded-md px-2 py-1 w-full"
        >
          {reasonOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
          ))}
        </select>
      </div>
  );
});

export default RefundReasonForm;
