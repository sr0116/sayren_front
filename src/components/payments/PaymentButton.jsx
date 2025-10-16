"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
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

  // PortOne SDK 로드 확인
  useEffect(() => {
    if (window.IMP) {
      console.log("PortOne SDK 이미 로드됨");
      setSdkLoaded(true);
    }
  }, []);

  const handleClick = async () => {
    if (!sdkLoaded || !window.IMP) {
      alert("결제 모듈이 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    try {
      setLoading(true);
      console.log("결제 시작 - orderItemId:", orderItemId);

      // 결제 준비 요청
      const paymentData = await preparePayment({ orderItemId });
      console.log("결제 준비 응답:", paymentData);

      // PortOne 결제 요청 (팝업 모드)
      const rsp = await requestPortOnePayment(paymentData);
      console.log("PortOne 응답:", rsp);

      if (!rsp || !rsp.imp_uid) {
        throw new Error("PortOne 결제 응답이 올바르지 않습니다.");
      }

      // 결제 완료 검증 요청
      const result = await completePayment({
        paymentId: paymentData.paymentId,
        impUid: rsp.imp_uid,
      });
      console.log("백엔드 결제 검증 결과:", result);

      // 결제 성공 시 모달 표시
      if (result.paymentStatus === "PAID") {
        dispatch(
            openModal({
              content: (
                  <ConfirmDialog
                      title="결제 완료"
                      message="결제 페이지로 이동하시겠습니까?"
                      confirmText="결제 내역 보기"
                      cancelText="메인으로 이동"
                      onConfirm={() => router.push("/mypage/payment")}
                      onCancel={() => router.push("/")}
                  />
              ),
            })
        );
      } else if (result.paymentStatus === "FAILED") {
        alert("결제에 실패했습니다. 다시 시도해주세요.");
      } else if (result.paymentStatus === "CANCELED") {
        alert("결제가 취소되었습니다.");
      } else {
        alert(`결제 상태를 확인할 수 없습니다: ${result.paymentStatus}`);
      }
    } catch (err) {
      console.error("결제 처리 중 오류:", err);
      alert("결제 중 오류가 발생했습니다: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        {/* PortOne SDK 로드 */}
        <Script
            src="https://cdn.iamport.kr/v1/iamport.js"
            strategy="afterInteractive"
            onLoad={() => {
              console.log("PortOne SDK 로드 완료");
              if (window.IMP) {
                // popup 모드 강제 적용
                window.IMP.init(process.env.NEXT_PUBLIC_IMP_CODE, { popup: true });
              }
              setSdkLoaded(true);
            }}
            onError={() => {
              console.error("PortOne SDK 로드 실패");
              setSdkLoaded(false);
            }}
        />

        {/* 공용 버튼 사용 */}
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
                  ? "모듈 로드중..."
                  : "결제하기"}
        </Button>
      </>
  );
}
