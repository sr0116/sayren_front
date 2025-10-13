"use client";

export default function SubscribePriceInfo({ subscribe }) {
  return (
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
        <div>
          <p className="font-medium text-gray-800">월 렌탈료</p>
          <p>{subscribe.monthlyFeeSnapshot?.toLocaleString()}원</p>
        </div>
        <div>
          <p className="font-medium text-gray-800">보증금</p>
          <p>{subscribe.depositSnapshot?.toLocaleString()}원</p>
        </div>
        <div>
          <p className="font-medium text-gray-800">총 기간</p>
          <p>{subscribe.totalMonths}개월</p>
        </div>
      </div>
  );
}
