"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/components/common/Button";
import {useApiMutation} from "@/hooks/useApi";
import {closeModal, openModal} from "@/store/modalSlice";
import {useFormInput} from "@/hooks/useFormInput";

export default function ReviewNewPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken"); // 로그인 시 저장된 토큰
      const res = await axios.post(
        "http://localhost:8080/api/boards",
        {
          title,
          content,
          categoryId: 3,   // REVIEW 카테고리 ID (DB 값에 맞게 수정 필요)
          productId: 1,    // 특정 상품에 대한 후기라면 productId 지정
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("등록 성공:", res.data);
      alert("게시글 등록 성공!");
      router.push("/board/review"); // 등록 후 목록으로 이동
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록 실패!");
    }
  };
  const { formData: boardCreateDTO, handleChange } = useFormInput({
    title: "",
    content: "",
    name: "",
    serviceAgree: false,
    privacyAgree: false,
  })


  const signupMutation = useApiMutation("POST", "/api/user/board/review", {
    options: {
      onSuccess: () => {
        dispatch(openModal(
          <div className="flex flex-col justify-center items-center gap-2 max-w-6xl">
            <p>리뷰등록이 완료되었습니다.</p>
            <Button variant={"primary"} onClick={() => {
              dispatch(closeModal());
              setTimeout(() => router.push("/board/review"), 200);
            }}>
              확인
            </Button>
          </div>
        ))
      },
      onError: (err) => {
        dispatch(openModal(
          <div className="flex flex-col justify-center items-center gap-2 max-w-6xl">
            <p>리뷰 등록에 실패했습니다. 다시 시도해주세요.</p>
            <Button variant={"primary"} onClick={() => {
              dispatch(closeModal());
            }}>
              확인
            </Button>
          </div>
        ))
      },
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">리뷰 작성</h2>

      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
        {/* 제목 */}
        <div>
          <label className="block mb-1 font-semibold">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        {/* 별점 */}
        <div>
          <label className="block mb-1 font-semibold">별점</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-2 rounded w-full"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} 점
              </option>
            ))}
          </select>
        </div>

        {/* 내용 */}
        <div>
          <label className="block mb-1 font-semibold">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 rounded w-full"
            rows={4}
            placeholder="리뷰를 작성해주세요"
            required
          />
        </div>

        {/* 첨부파일 */}
        <div>
          <label className="block mb-1 font-semibold">첨부파일</label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="inline-block border border-gray-900 px-3 py-1 text-sm rounded cursor-pointer hover:bg-gray-100"
          >
            파일 선택
          </label>
          <p className="mt-2 text-sm text-gray-600">
            {file ? file.name : "선택된 파일 없음"}
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-2">
          <Button type="submit" variant="primary" className="px-4 py-2 w-auto">
            등록
          </Button>
          <Button
            type="button"
            variant="outline"
            className="px-4 py-2 w-auto"
            onClick={() => router.push("/board/review")}
          >
            취소
          </Button>
        </div>
      </form>
    </div>
  );
}
