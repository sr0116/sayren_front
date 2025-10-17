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

  // SDK 동적 로드
  useEffect(() => {
    const scriptId = "portone-sdk";
    if (document.getElementById(scriptId)) {
      // 이미 로드된 경우
      setSdkLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    script.onload = () => {
      console.log(" PortOne SDK 로드 완료 (PaymentButton 내부)");
      if (window.IMP) {
        window.IMP.init(process.env.NEXT_PUBLIC_IMP_CODE, { popup: true });
        setSdkLoaded(true);
      }
    };
    script.onerror = () => {
      console.error(" PortOne SDK 로드 실패");
    };

    document.body.appendChild(script);
  }, []);

  //  결제 처리
  const handleClick = async () => {
    if (!sdkLoaded || !window.IMP) {
      alert("결제 모듈이 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    try {
      setLoading(true);
      console.log("결제 시작 - orderItemId:", orderItemId);

      const paymentData = await preparePayment({ orderItemId });
      const rsp = await requestPortOnePayment(paymentData);

      if (!rsp || !rsp.imp_uid) throw new Error("결제 응답 오류");

      const result = await completePayment({
        paymentId: paymentData.paymentId,
        impUid: rsp.imp_uid,
      });

      if (result.paymentStatus === "PAID") {
        dispatch(
            openModal({
              content: (
                  <ConfirmDialog
                      title="결제 완료"
                      message="결제가 정상적으로 완료되었습니다."
                      confirmText="결제 내역 보기"
                      cancelText="메인으로 이동"
                      onConfirm={() => router.push("/mypage/payment")}
                      onCancel={() => router.push("/")}
                  />
              ),
            })
        );
      } else {
        alert(`결제 상태를 확인할 수 없습니다: ${result.paymentStatus}`);
      }
    } catch (err) {
      console.error(" 결제 중 오류:", err);
      alert("결제 처리 중 오류가 발생했습니다: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Button
          variant="primary"
          type="button"
          onClick={handleClick}
          disabled={loading || !sdkLoaded}
          className={`w-40 ${
              loading || !sdkLoaded ? "opacity-60 cursor-not-allowed" : ""
          }`}
      >
        {loading
            ? "결제 진행중..."
            : !sdkLoaded
                ? "결제 모듈 준비중..."
                : "결제하기"}
      </Button>
  );
}
