// src/app/mypage/orders/page.js
"use client";

import { useEffect, useState } from "react";
import { getOrdersByMember } from "@/api/orderApi";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // 로그인된 사용자 id 가져오기 (팀 공통 AuthContext or 토큰 decode)
    const memberId = 1; // TODO: 실제 로그인 세션에서 가져오기
    getOrdersByMember(memberId)
      .then(setOrders)
      .catch(err => console.error("주문 내역 불러오기 실패", err));
  }, []);

  return (
    <div>
      <h2>주문 내역</h2>
      {orders.length === 0 ? (
        <p>주문 내역이 없습니다.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              주문번호 {order.id} / 상태 {order.status} / 총액 {order.totalPrice}원
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
