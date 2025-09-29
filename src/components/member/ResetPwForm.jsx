"use client";

import React from "react";
import {noApi} from "@/lib/axios";
import NotFound from "@/app/not-found";
import {useQuery} from "@tanstack/react-query";
import ChangePwForm from "@/components/member/ChangePwForm";

export default function ResetPwForm({token}) {

  const {isLoading, isError} = useQuery({
    queryKey: ["reset-validate", token],
    queryFn: async () => {
      const res = await noApi.get(`/api/auth/reset-pw/validate?token=${token}`);
      return res.data ?? true;
    },
    enabled: !!token,
    retry: false,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  if (isLoading) return <div></div>;
  if (isError) return <NotFound/>;

  return (
      <div>
        <h2 className="text-center text-3xl font-medium mb-8">비밀번호 재설정</h2>
        <div className="max-w-[400px] mx-auto rounded-lg p-6 border border-gray-200 bg-white">
          <ChangePwForm token={token} buttonText="비밀번호 재설정"/>
        </div>
      </div>
    )
}