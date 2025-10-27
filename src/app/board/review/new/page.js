"use client";
export const dynamic = "force-dynamic";

import nextDynamic from "next/dynamic";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TextInput } from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useFormInput } from "@/hooks/useFormInput";
import { useReviewCreateMutation } from "@/api/reviewApi";
import { queryClient } from "@/lib/queryClient";

// ✅ SSR 비활성화된 ReactQuill
const ReactQuill = nextDynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function ReviewNewPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [content, setContent] = useState("");

  const productId = Number(params.get("productId") || 0);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">리뷰 작성</h1>
      <ReactQuill theme="snow" value={content} onChange={setContent} />
    </div>
  );
}
