"use client";

import {useApiQuery} from "@/hooks/useApi";
import {QRCodeCanvas} from "qrcode.react";
import CopyButton from "@/components/common/CopyButton";
import Check2fa from "@/components/member/Check2fa";
import {use2faRegisterMutation} from "@/api/authApi";
import {useDispatch} from "react-redux";
import {closeModal, openModal} from "@/store/modalSlice";
import Button from "@/components/common/Button";
import React from "react";
import {queryClient} from "@/lib/queryClient";

export default function QRcode(){
  const { data, isLoading, isError } = useApiQuery(
    ["2faqr"],
    "/api/auth/2fa-qr",
    {
      options: {
        staleTime: 1000 * 30,
        cacheTime: 0,
      },
    }
  );



  const dispatch = useDispatch();


  const member2faRegister = use2faRegisterMutation({
    onSuccess: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>2차인증 등록이 완료되었습니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)
      }))
      queryClient.setQueryData(["2fa"], true);
      queryClient.removeQueries({ queryKey: ["2faqr"] });
    },
    onError: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>2차인증 등록에 실패했습니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)
      }))
    }
  })

  if (isLoading) return (<div>QR코드 불러오는중</div>);
  if (isError) return (<div>QR코드 불러오는중 에러가 발생했습니다.</div>);



  const otpAuthUrl = data.qrCodeUrl;
  const url = new URL(otpAuthUrl.replace("otpauth://", "https://"));
  const secret = url.searchParams.get("secret");

  return (
    <div className="flex flex-col justify-center items-center w-full gap-6">
      <p className="text-xl text-center">Google Authenticator에서 <br/> QR을 스캔 or 설정키를 등록해주세요.</p>
      <QRCodeCanvas value={otpAuthUrl} size={200}/>
      <CopyButton copyText={secret}>설정 키 복사</CopyButton>
      <p className="text-s mt-4">등록을 위해 인증번호를 작성해주세요.</p>
      <Check2fa buttonText="2차인증 등록" mutation={member2faRegister}/>
    </div>
  )
}