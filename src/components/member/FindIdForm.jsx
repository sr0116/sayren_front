"use client";

import TelCheckForm from "@/components/auth/TelCheckForm";
import React, {useState} from "react";
import {useFindIdMutation} from "@/api/memberApi";
import {useDispatch} from "react-redux";
import {closeModal, openModal} from "@/store/modalSlice";
import Button from "@/components/common/Button";
import dayjs from "dayjs";

export default function FindIdForm(){
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [idData, setIdData] = useState(null);

  const findIdMutation = useFindIdMutation({
    onSuccess:(data) => {
      setCheck(true);
      setIdData(data);
    },
    onError:() => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>정확한 인증번호를 입력해주세요.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)
      }))
    }
  })



  return(
      <div>
        {check? (
          <div>
            {idData?.email ? (
              <div>
                <p>아이디를 찾았습니다.</p>
                <div className="flex justify-between">
                  <p>{idData.email}</p>
                  <p>{dayjs(idData.regDate).format("YYYY년 MM월 DD일")} 가입</p>
                </div>
              </div>
            ) : (
            <p>해당 휴대폰으로 등록된 아이디가 없습니다.</p>
            )
          }
          </div>
        ) : (
          <TelCheckForm col={true} mutation={findIdMutation}/>
        )}
      </div>
    )
}