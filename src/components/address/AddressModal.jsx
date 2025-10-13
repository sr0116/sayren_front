"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DaumPostcode from "react-daum-postcode";
import { addressApi } from "@/api/addressApi";
import { closeModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import Button from "@/components/common/Button";

export default function AddressModal({ onSelect }) {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const [showPostcode, setShowPostcode] = useState(false);

    const [form, setForm] = useState({
        name: "",
        tel: "",
        zipcode: "",
        address: "",
        memo: "",
        isDefault: true,
    });

    /**
     * ✅ 배송지 목록 조회
     */
    const {
        data: addresses = [],
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["addresses"],
        queryFn: () => addressApi.getAll(),
    });

    /**
     * ✅ 신규 배송지 등록
     */
    const createAddress = useMutation({
        mutationFn: (data) => addressApi.create(data),
        onSuccess: () => {
            alert("배송지가 등록되었습니다!");
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            refetch();
            setShowForm(false);
        },
        onError: (err) => {
            console.error("배송지 등록 실패:", err);
            alert("배송지 등록 중 오류가 발생했습니다.");
        },
    });

    /**
     * ✅ 카카오 주소 선택 핸들러
     */
    const handleSelectAddress = (data) => {
        setForm({
            ...form,
            zipcode: data.zonecode,
            address: data.roadAddress,
        });
        setShowPostcode(false);
    };

    /**
     * ✅ 배송지 선택 → CheckoutPage로 전달
     * → 필드명 통일 + 정상화(Normalize)
     */
    const handleSelect = (addr) => {
        if (!addr) return;

        // 💡 서버/DB 구조와 CheckoutPage 필드 불일치 해결
        const normalized = {
            name: addr.name || addr.receiverName || "",
            tel: addr.tel || addr.receiverTel || "",
            zipcode: addr.zipcode || addr.zipCode || "",
            address: addr.address || addr.addressDetail || "",
            memo: addr.memo || addr.deliveryMemo || "",
        };

        if (onSelect) onSelect(normalized);
        dispatch(closeModal());
    };

    return (
      <div className="p-6 w-[550px] bg-white rounded-lg">
          {/* ------------------------------- */}
          {/* 🚩 배송지 목록 화면 */}
          {/* ------------------------------- */}
          {!showForm ? (
            <>
                <h2 className="text-xl font-bold mb-4">배송지 관리</h2>

                {isFetching ? (
                  <p className="text-gray-400">불러오는 중...</p>
                ) : addresses.length === 0 ? (
                  <p className="text-gray-500 mb-4">등록된 배송지가 없습니다.</p>
                ) : (
                  <ul className="space-y-2 mb-4 max-h-[300px] overflow-y-auto border rounded p-2">
                      {addresses.map((addr) => (
                        <li
                          key={addr.id}
                          className="border rounded p-3 cursor-pointer hover:bg-gray-100 transition"
                          onClick={() => handleSelect(addr)}
                        >
                            <p className="font-medium">
                                {addr.name || addr.receiverName} |{" "}
                                {addr.tel || addr.receiverTel}
                            </p>
                            <p className="text-sm text-gray-600">
                                {addr.address || addr.addressDetail}
                            </p>
                            {addr.isDefault && (
                              <span className="text-blue-500 text-xs">기본 배송지</span>
                            )}
                        </li>
                      ))}
                  </ul>
                )}

                <Button variant="primary" onClick={() => setShowForm(true)}>
                    신규 배송지 추가
                </Button>
            </>
          ) : (
            <>
                {/* ------------------------------- */}
                {/* 🚩 신규 배송지 등록 화면 */}
                {/* ------------------------------- */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold mb-2">신규 배송지 등록</h3>

                    <input
                      className="border rounded w-full p-2"
                      placeholder="수령인"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <input
                      className="border rounded w-full p-2"
                      placeholder="연락처"
                      value={form.tel}
                      onChange={(e) => setForm({ ...form, tel: e.target.value })}
                    />

                    <div className="flex gap-2">
                        <input
                          className="border rounded flex-1 p-2"
                          placeholder="우편번호"
                          value={form.zipcode}
                          readOnly
                        />
                        <Button onClick={() => setShowPostcode(true)}>주소 찾기</Button>
                    </div>

                    <input
                      className="border rounded w-full p-2"
                      placeholder="주소"
                      value={form.address}
                      readOnly
                    />

                    <input
                      className="border rounded w-full p-2"
                      placeholder="배송 메모"
                      value={form.memo}
                      onChange={(e) => setForm({ ...form, memo: e.target.value })}
                    />

                    <Button
                      variant="primary"
                      className="w-full mt-3"
                      onClick={() => createAddress.mutate(form)}
                    >
                        등록하기
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowForm(false)}
                    >
                        목록으로 돌아가기
                    </Button>

                    {showPostcode && (
                      <div className="mt-4 border rounded">
                          <DaumPostcode onComplete={handleSelectAddress} />
                      </div>
                    )}
                </div>
            </>
          )}
      </div>
    );
}
