"use client";

import { SiNaver, SiKakaotalk } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import dayjs from "dayjs";
import {useSocialConnectMutation} from "@/api/authApi";
import {useDispatch} from "react-redux";
import {closeModal, openModal} from "@/store/modalSlice";
import Button from "@/components/common/Button";
import React from "react";
import {useSocialDisconnectMutation} from "@/api/memberApi";
import {queryClient} from "@/lib/queryClient";

export default function SocialAccountCard({
                                            provider,
                                            providerOb,
                                          }) {
  const providerConfig = {
    google: {
      name: "구글 계정",
      icon: <FcGoogle size={20} />,
    },
    naver: {
      name: "네이버 계정",
      icon: <SiNaver size={20} className="text-green-500" />,
    },
    kakao: {
      name: "카카오 계정",
      icon: <SiKakaotalk size={20} className="text-gray-800" />,
    },
  };

  const { name, icon } = providerConfig[provider];
  const dispatch = useDispatch();

  const socialConnectMutation = useSocialConnectMutation({
    onSuccess: (data) => {
      const {redirectUrl} = data;
      window.open(
        redirectUrl,
        `${provider}Login`,
        "width=500,height=600"
      );
    },
    onError: (error) => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>연동 시작에 실패하였습니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)}
      ));
    }
  }, provider)

  const handleConnect = (e) => {
    e.preventDefault();
    socialConnectMutation.mutate();
  }



  const socialDisconnectMutation = useSocialDisconnectMutation({
    onSuccess: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>{provider} 계정 연결 해제에 성공하였습니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)}
      ));
      queryClient.invalidateQueries("social-list");
    },
    onError: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>비밀번호가 없는 마지막 소셜계정 {provider}의 연동해제가 불가능합니다.</p>
          <Button variant={"primary"} onClick={() => {
            dispatch(closeModal());
          }}>
            확인
          </Button>
        </div>)}
      ));
    }
  })

  const handleDisconnect = (e) => {
    e.preventDefault();
    socialDisconnectMutation.mutate({
      data: {provider: provider.toUpperCase()}
    });
  }



  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-2 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <p className="font-medium">{name}</p>
        </div>
        {providerOb?.email ? (
          <button
            onClick={handleDisconnect}
            className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100 cursor-pointer"
          >
            연결해제
          </button>
        ) : (
          <button
            onClick={handleConnect}
            className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100 cursor-pointer"
          >
            연결하기
          </button>
        )}
      </div>

      {providerOb?.email ? (
        <div className="mt-2 flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600">
          <span>{providerOb.email}</span>
          <span>{dayjs(providerOb.regDate).format("YYYY년 MM월 DD일")} 연결됨</span>
        </div>
      ) : (
        <p className="mt-2 text-sm text-gray-400">연결된 계정이 없습니다.</p>
      )}
    </div>
  );
}
