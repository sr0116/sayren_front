"use client";

import { useRemoveCartItemMutation } from "@/api/cartApi";

export default function RemoveCartItemButton({ cartItemId, productName }) {
  const removeCartItem = useRemoveCartItemMutation({
    onSuccess: () => {
      alert(`${productName}이(가) 장바구니에서 삭제되었습니다.`);
      window.location.reload();
    },
    onError: (err) => {
      console.error("삭제 실패:", err);
      alert("상품 삭제 중 오류가 발생했습니다.");
    },
  }, cartItemId);

  const handleRemove = () => {
    if (confirm(`${productName}을(를) 장바구니에서 삭제하시겠습니까?`)) {
      removeCartItem.mutate();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={handleRemove}
        className="bg-gray-500 text-white text-xs font-medium px-3 py-1 rounded-md hover:bg-gray-700 transition shadow-sm"
        style={{
          minWidth: "48px",
          height: "28px",
        }}
      >
        삭제
      </button>
    </div>
  );
}
