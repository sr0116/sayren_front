"use client";

export default function TestToast() {
  return (
      <div className="p-10 space-x-4">
        <button
            onClick={() => window.toast("success", "결제가 완료되었습니다")}
            className="px-4 py-2 bg-green-600 text-white rounded"
        >
          성공 토스트
        </button>
        <button
            onClick={() => window.toast("error", "결제에 실패했습니다")}
            className="px-4 py-2 bg-red-600 text-white rounded"
        >
          실패 토스트
        </button>
        <button
            onClick={() => window.toast("warning", "배송 지연이 발생했습니다")}
            className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          경고 토스트
        </button>
        <button
            onClick={() => window.toast("info", "새로운 알림이 있습니다")}
            className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          정보 토스트
        </button>
      </div>
  );
}