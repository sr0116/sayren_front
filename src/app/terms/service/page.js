"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function ServicePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/terms/service`
        );
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("서비스 이용약관 조회 실패:", e);
      }
    }
    load();
  }, []);

  if (!data) {
    return (
        <div>
          <h1 className="text-center mb-16 font-semibold text-2xl">
            서비스 이용약관
          </h1>
          <p>서비스 이용약관을 불러오는 중입니다...</p>
        </div>
    );
  }

  return (
      <div>
        <div className="mb-4">
          [{dayjs(data.regDate).format("YYYY년 MM월 DD일")} 개정]
        </div>
        <h1 className="text-center mb-16 font-semibold text-2xl">
          서비스 이용약관
        </h1>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
  );
}
