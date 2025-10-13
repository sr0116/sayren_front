"use client";

export default function SubscribeHeader({ subscribe }) {
  return (
      <div className="p-4 bg-gray-100 rounded-md">
        <h3 className="text-lg font-bold text-gray-800">
          {subscribe.productName || "상품명 미지정"}
        </h3>
        <p className="text-sm text-gray-600">
          상태: {subscribe.status} / 구독 ID: {subscribe.subscribeId}
        </p>
        <p className="text-sm text-gray-500">
          {subscribe.memberName} ({subscribe.memberEmail})
        </p>
      </div>
  );
}
