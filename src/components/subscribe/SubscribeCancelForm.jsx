"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { getEnumOptions } from "@/utils/enumOptions";

const SubscribeCancelForm = forwardRef((props, ref) => {
  const [reason, setReason] = useState("USER_REQUEST");
  const reasonOptions = getEnumOptions("ReasonCode");

  useImperativeHandle(ref, () => ({
    getSelectedReason: () => reason,
  }));

  return (
      <div className="space-y-3">
        <p>이 구독을 취소하시겠습니까?</p>
        <label className="block text-sm font-medium">취소 사유 선택</label>
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


SubscribeCancelForm.displayName = "SubscribeCancelForm";

export default SubscribeCancelForm;
