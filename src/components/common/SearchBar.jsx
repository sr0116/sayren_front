"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {TextInput} from "@/components/common/Input";
import Button from "@/components/common/Button";

export default function SearchBar({keyword = "", onReset}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(keyword ?? "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString()); // 기존 쿼리 유지
    if (search.trim()) {
      params.set("keyword", search.trim()); // keyword만 갱신
    } else {
      params.delete("keyword"); // 빈값이면 제거
    }

    router.push(`?${params.toString()}`); // 새 URL로 이동
  };

  return (
    <div className="flex gap-2 items-center w-full mx-8 md:mx-40">
      <TextInput
        type="text"
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        variant="primary"
        disabled={keyword === search || search === ""}
        onClick={handleSearch}
        className="max-w-[100px]"
      >
        검색
      </Button>

      <Button
        variant="secondary"
        onClick={onReset}
        className="max-w-[100px]"
      >
        초기화
      </Button>
    </div>
  );
}
