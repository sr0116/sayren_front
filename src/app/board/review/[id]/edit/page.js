// app/board/review/[id]/edit/page.js
"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { getReviewById, updateReview } from "@/api/reviewApi";
import { TextInput } from "@/components/common/Input";
import Button from "@/components/common/Button";

const Editor = dynamic(() => import("@toast-ui/react-editor").then(m => m.Editor), { ssr: false });

export default function ReviewEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const editorRef = useRef(null);
  const [form, setForm] = useState({ title: "", content: "", productId: null });
  const [loading, setLoading] = useState(true);

  // 기존 데이터 불러오기
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const data = await getReviewById(id);
        setForm({ title: data.title, content: data.content, productId: data.productId });
        // Editor가 렌더링된 후 HTML 주입
        setTimeout(() => {
          editorRef.current?.getInstance().setHTML(data.content || "");
        }, 0);
      } catch (err) {
        console.error("[리뷰 불러오기 실패]", err);
        alert("리뷰를 불러오는 데 실패했습니다.");
        router.push("/board/review");
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [id, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = editorRef.current?.getInstance().getHTML() || "";
      await updateReview(id, { ...form, content, productId: form.productId });
      alert("수정 완료!");
      router.push(`/board/review/${id}`);
    } catch (err) {
      console.error("[리뷰 수정 실패]", err);
      alert("수정 실패: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <p>불러오는 중...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto p-6 bg-white">
      <TextInput
        name="title"
        type="text"
        value={form.title}
        onChange={handleChange}
        placeholder="제목을 입력하세요"
      />

      <Editor
        ref={editorRef}
        height="460px"
        initialEditType="wysiwyg"
        hideModeSwitch={true}
        usageStatistics={false}
        initialValue={form.content}
      />

      <div className="flex gap-2 mt-4">
        <Button type="submit">수정 완료</Button>
        <Button variant="outline" onClick={() => router.push(`/board/review/${id}`)}>취소</Button>
      </div>
    </form>
  );
}
