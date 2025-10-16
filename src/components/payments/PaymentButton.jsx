// PaymentButton.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Button from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { openModal } from "@/store/modalSlice";
import { preparePayment, completePayment } from "@/api/paymentApi";
import { requestPortOnePayment } from "@/lib/portone";

export default function PaymentButton({ orderItemId }) {
  const [loading, setLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // PortOne SDK 로드 감지
  useEffect(() => {
    if (window.IMP) {
      console.log("✅ PortOne SDK 감지됨");
      window.IMP.init(process.env.NEXT_PUBLIC_IMP_CODE, { popup: true });
      setSdkLoaded(true);
    } else {
      // SDK 로딩 지연 시 재확인
      const timer = setInterval(() => {
        if (window.IMP) {
          console.log("✅ PortOne SDK 재확인 후 감지됨");
          window.IMP.init(process.env.NEXT_PUBLIC_IMP_CODE, { popup: true });
          setSdkLoaded(true);
          clearInterval(timer);
        }
      }, 500);
      return () => clearInterval(timer);
    }
  }, []);

  const handleClick = async () => {
    if (!sdkLoaded || !window.IMP) {
      alert("결제 모듈이 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

  };

  return (
      <Button
          variant="primary"
          type="button"
          onClick={handleClick}
          disabled={loading || !sdkLoaded}
          className={`w-40 ${loading || !sdkLoaded ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {loading ? "결제 진행중..." : !sdkLoaded ? "결제 모듈 준비중..." : "결제하기"}
      </Button>
  );
}
