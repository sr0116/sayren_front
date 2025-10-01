import axios from "@/lib/axios";

// 장바구니 담기
export const addCartItem = async ({ productId, planId, quantity }) => {
  const res = await axios.post("/api/proxy/api/user/cart", {
    productId,
    planId,
    quantity,
  });
  return res.data;
};

// 장바구니 조회
export const getCartItems = async () => {
  const res = await axios.get("/api/proxy/api/user/cart");
  return res.data;
};

// 단일 아이템 삭제
export const removeCartItem = async (cartItemId) => {
  const res = await axios.delete(`/api/proxy/api/user/cart/item/${cartItemId}`);
  return res.data;
};

// 장바구니 전체 비우기
export const clearCart = async () => {
  const res = await axios.delete("/api/proxy/api/user/cart/clear");
  return res.data;
};
