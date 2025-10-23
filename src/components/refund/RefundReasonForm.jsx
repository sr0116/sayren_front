"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { userRefundOptions } from "@/utils/enumOptions";


const RefundReasonForm = forwardRef((props, ref) => {
  const [reason, setReason] = useState("USER_REQUEST");

  //  환불 사유 옵션
  const reasonOptions = userRefundOptions.flatMap((group) => group.options);

  useImperativeHandle(ref, () => ({
    getSelectedReason: () => reason,
  }));

  return (
      <div className="space-y-3">
        <p className="text-sm text-gray-700">
          이 결제 건에 대해 환불을 요청하시겠습니까?
        </p>

        <label className="block text-sm font-medium text-gray-600">
          환불 사유 선택
        </label>

        <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
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

RefundReasonForm.displayName = "RefundReasonForm";
export default RefundReasonForm;
