"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminFaqPage() {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        axios.get("/api/admin/faqs")
            .then(res => setFaqs(res.data))
            .catch(console.error);
    }, []);

    return (
        <div>
            <h2>FAQ 목록</h2>
            <ul>
                {faqs.map(f => (
                    <li key={f.id}>{f.title}</li>
                ))}
            </ul>
          {/*<div className="mt-10 p-6 bg-gray-50 rounded-lg text-center border border-gray-200">*/}
          {/*  <p className="text-gray-700 font-medium mb-2">*/}
          {/*    궁금한 내용이 해결되지 않으셨나요?*/}
          {/*  </p>*/}
          {/*  <p className="text-gray-500 mb-4">*/}
          {/*    언제든지 고객센터 또는{" "}*/}
          {/*    <span className="text-[#ff0066] font-semibold">문의하기</span> 게시판을 통해 문의해주세요 💬*/}
          {/*  </p>*/}
          {/*  <Link*/}
          {/*    href="/board/support/qna"*/}
          {/*    className="inline-block bg-[#ff0066] text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition"*/}
          {/*  >*/}
          {/*    문의하러 가기*/}
          {/*  </Link>*/}
          {/*</div>*/}
        </div>
    );
}
