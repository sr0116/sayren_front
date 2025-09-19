"use client";
import { useDispatch } from "react-redux";
import { open } from "@/store/modalSlice";

export default function Page() {
  const dispatch = useDispatch();

  return (
      <button
          onClick={() =>
              dispatch(open(<p className="text-center">안녕 상현아 👋</p>))
          }
          className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        모달 열기
      </button>
  );
}
