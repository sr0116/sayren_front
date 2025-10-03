"use client";

import { useState } from "react";

export default function CheckoutForm({ contract, setContract }) {
  return (
    <div className="space-y-3">
      <input
        className="w-full border p-2 rounded"
        placeholder="이름"
        value={contract.name}
        onChange={(e) => setContract({ ...contract, name: e.target.value })}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="휴대폰 번호"
        value={contract.phone}
        onChange={(e) => setContract({ ...contract, phone: e.target.value })}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="생년월일 (YYYYMMDD)"
        value={contract.birth}
        onChange={(e) => setContract({ ...contract, birth: e.target.value })}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="이메일"
        value={contract.email}
        onChange={(e) => setContract({ ...contract, email: e.target.value })}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="주소"
        value={contract.address}
        onChange={(e) => setContract({ ...contract, address: e.target.value })}
      />
    </div>
  );
}
