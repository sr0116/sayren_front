"use client";
import { useDispatch } from "react-redux";
import {openModal} from "@/store/modalSlice";
import Button from "@/components/common/Button";

export default function Page() {
  const dispatch = useDispatch();

  return (
      <div>
        <Button onClick={() => dispatch(openModal(<p className="text-center">안녕 세이렌</p>))} variant={"primary"}>
          모달 열기
        </Button>
        <Button onClick={() => dispatch(openModal(<p className="text-center">안녕 상현아 👋</p>))} variant={"secondary"} >
          모달 열기
        </Button>
        <Button onClick={() => dispatch(openModal(<p className="text-center">ㅋㅋ 👋</p>))} variant={"outline"}>
          모달 열기
        </Button>
      </div>
  );
}
