"use client";

import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useSubscribeRoundsQuery } from "@/api/subscribeApi";
import { prepareRoundPayment, completePayment } from "@/api/paymentApi";
import Button from "@/components/common/Button";
import StatusBadge from "@/components/common/StatusBadge";
import { useState, useEffect } from "react";

export default function SubscribeRoundList() {
  const { id: subscribeId } = useParams();
  const router = useRouter();
  const [loadingRoundId, setLoadingRoundId] = useState(null);

  //  SDK 로드 보장
  useEffect(() => {
    if (!window.IMP) {
      const script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/v1/iamport.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const { data: rounds = [], isLoading, isError } =
      useSubscribeRoundsQuery(subscribeId);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>회차 목록 조회 실패</div>;

  const handlePay = async (round) => {
    try {
      setLoadingRoundId(round.subscribeRoundId);

      const paymentData = await prepareRoundPayment(round.subscribeRoundId);
      if (!paymentData?.merchantUid) {
        throw new Error("merchantUid 없음: " + JSON.stringify(paymentData));
      }

      const IMP = window.IMP;
      if (!IMP) {
        alert("PortOne SDK가 아직 로드되지 않았습니다.");
        return;
      }
      IMP.init(process.env.NEXT_PUBLIC_IMP_CODE);

      const paymentRequest = {
        pg: "nice_v2",
        merchant_uid: paymentData.merchantUid,
        name: `구독 ${subscribeId} - ${round.roundNo}회차`,
        amount: paymentData.amount,
      };

      IMP.request_pay(paymentRequest, async (rsp) => {
        if (rsp.success && rsp.imp_uid) {
          try {
            const result = await completePayment({
              paymentId: paymentData.paymentId,
              impUid: rsp.imp_uid,
            });

            if (result.paymentStatus === "PAID") {
              alert(`${round.roundNo}회차 결제 성공!`);
            } else {
              alert(`${round.roundNo}회차 결제 실패 또는 취소`);
            }
          } catch (err) {
            console.error("결제 검증 실패:", err);
            alert("결제 검증 실패: " + err.message);
          }
        } else {
          alert("사용자 결제 취소 또는 실패: " + rsp.error_msg);
        }
      });
    } catch (err) {
      console.error("결제 처리 중 오류:", err);
      alert("결제 오류: " + err.message);
    } finally {
      setLoadingRoundId(null);
    }
  };

  return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">
            구독 {subscribeId} 회차 목록
          </h2>
          <Button
              variant="outline"
              onClick={() => router.push("/mypage/subscribe")}
              className="px-3 py-1 text-sm w-auto"
          >
            구독 목록으로
          </Button>
        </div>

        {rounds.length === 0 ? (
            <p className="text-gray-500 text-center">회차 정보가 없습니다.</p>
        ) : (
            <ul className="divide-y divide-gray-200">
              {rounds.map((r) => (
                  <li
                      key={r.subscribeRoundId}
                      className="py-4 px-2 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                      onClick={() =>
                          router.push(`/mypage/subscribe/${subscribeId}/rounds/${r.roundNo}`)
                      }
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{r.roundNo}회차</p>
                      <p className="text-sm text-gray-500">
                        월 렌탈 금액: {r.amount?.toLocaleString()}원
                      </p>
                      <p className="text-sm text-gray-500">
                        예정일: {dayjs(r.dueDate).format("YYYY-MM-DD")}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <StatusBadge type="PaymentStatus" value={r.payStatus} />
                      {r.payStatus === "PENDING" && (
                          <button
                              onClick={(e) => {
                                e.stopPropagation(); // 클릭 이벤트 버블링 막기 (상세 페이지 이동 방지)
                                handlePay(r);
                              }}
                              disabled={loadingRoundId === r.subscribeRoundId}
                              className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
                          >
                            {loadingRoundId === r.subscribeRoundId ? "결제중..." : "결제하기"}
                          </button>
                      )}
                    </div>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
}
