"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";
import {createReview} from "@/api/reviewApi"; // 실제 API 함수 import
import Button from "@/components/common/Button"; // 공통 버튼 import

// dynamic import (named export Editor 불러오기)
const Editor = dynamic(
  async () => {
    const { Editor } = await import("@toast-ui/react-editor");
    return Editor;
  },
  { ssr: false }
);

export default function ReviewNewPage() {
  const router = useRouter();
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 내용 가져오기 (없으면 빈 문자열로 보정)
    const content = editorRef.current?.getInstance().getHTML() || "";

    const instance = editorRef.current?.getInstance();
    const html = instance?.getHTML() || "";
    const text = html.replace(/<[^>]*>/g, "").trim(); // 태그 제거 후 순수 텍스트만 남김


    // 유효성 검사 + 토스트 알림
    if (!title.trim()) return window.toast("error", "제목은 필수입니다");
    if (!content.trim()) return window.toast("error", "내용은 필수입니다");

    try {
      // 등록 API 호출
      await createReview({
        categoryId: 3,   // DB에 맞는 REVIEW 카테고리 ID
        title,
        content,
        secret: false,   // 후기 게시판은 비밀글 불가
      });

      window.toast("success", "등록 완료!");
      router.push("/board/review"); // 등록 후 목록으로 이동
    } catch (err) {
      console.error(err);
      window.toast("error", "등록 실패, 서버 오류 발생");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">후기 작성</h1>

      {/* 제목 입력 */}
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />

      {/* TOAST UI Editor */}
      <Editor
        ref={editorRef}
        initialValue="후기내용을 입력하세요"
        previewStyle="vertical"
        height="500px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
      />

      {/* 버튼 영역 */}
      <div className="flex gap-2">
        <Button variant="primary" type="submit" className="w-32">
          등록
        </Button>
        <Button
          variant="outline"
          type="button"
          className="w-32"
          onClick={() => router.push("/board/review")}
        >
          취소
        </Button>
      </div>
    </form>
  );
}
