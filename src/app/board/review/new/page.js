// app/board/review/new/page.js
"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { TextInput } from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useFormInput } from "@/hooks/useFormInput";
import { useReviewCreateMutation } from "@/api/reviewApi";

const Editor = dynamic(() => import("@toast-ui/react-editor").then(m => m.Editor), { ssr: false });

const isHtml = (html) => {
  if (!html) return false;
  const box = document.createElement("div");
  box.innerHTML = html;
  const hasMedia = !!box.querySelector("img, video, iframe, figure, svg, table");
  const text = (box.textContent || "")
    .replace(/\u00A0|\u200B|\u200C|\u200D|\uFEFF/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  return hasMedia || text.length > 0;
};

// ref/DOM 폴백으로 HTML 긁어오기
const grabHtml = (ref) => {
  const r = ref.current;
  let html = "";
  if (r?.getInstance) {
    try { html = r.getInstance().getHTML() || ""; } catch {}
  }
  if (!html && r?.editorInst?.getHTML) {
    try { html = r.editorInst.getHTML() || ""; } catch {}
  }
  if (!html) {
    const root = document.getElementById("review-editor-root");
    const ww = root?.querySelector(".toastui-editor-ww-container .toastui-editor-contents");
    const md = root?.querySelector(".toastui-editor-md-container .toastui-editor-contents");
    html = ww?.innerHTML || md?.innerHTML || "";
  }
  return html;
};

export default function ReviewNewPage() {
  const router = useRouter();
  const params = useSearchParams();
  const editorRef = useRef(null);
  const [editorHtml, setEditorHtml] = useState("");

  // 쿼리에서 productId 받기
  const productId = Number(params.get("productId") || 0);

  const { formData: form, handleChange } = useFormInput({
    title: "",
    categoryId: 2,
    isSecret: false,
  });

  const { mutate: createReview, isLoading } = useReviewCreateMutation({
    onSuccess: () => {
      alert("후기가 등록되었습니다!");
      router.push("/board/review");
    },
    onError: (err) => {
      console.error("[리뷰 등록 실패]", err);
      alert("등록 실패: " + (err.response?.data?.message || err.message));
    },
  });

  const handleEditorChange = () => setEditorHtml(grabHtml(editorRef));

  const handleSubmit = (e) => {
    e.preventDefault();

    // productId 없으면 막아
    // if (!productId) {
    //   alert("상품을 선택하고 후기 작성 페이지로 이동");
    //   return;
    // }

    const html = editorHtml || grabHtml(editorRef);

    console.group("[REVIEW/SUBMIT]");
    console.log("title:", form.title);
    console.log("productId:", productId);
    console.log("html.length:", html.length);
    console.log("isHtml:", isHtml(html));
    console.groupEnd();

    if (!form.title.trim()) {
      alert("제목을 입력하세요");
      return;
    }
    if (!isHtml(html)) {
      alert("내용을 입력하세요");
      return;
    }

    // productId 포함해서 보냄
    createReview({
      data: {
        ...form,
        productId:3,
        content: html,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto p-6 bg-white">
      <TextInput
        name="title"
        type="text"
        value={form.title}
        onChange={handleChange}
        placeholder="제목을 입력하세요"
      />

      <div id="review-editor-root">
        <Editor
          ref={editorRef}
          height="460px"
          initialEditType="wysiwyg"
          hideModeSwitch={true}
          usageStatistics={false}
          toolbarItems={[
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task"],
            ["table", "link"],
            ["image"],
            ["code", "codeblock"],
          ]}
          onChange={handleEditorChange}
        />
      </div>

      <div className="mt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "등록중..." : "등록하기"}
        </Button>
      </div>
    </form>
  );
}
