"use client";

import SocialAccountCard from "@/components/member/SocialAccountCard";
import {useSocialListQuery} from "@/api/memberApi";

export default function SocialAccount() {
  const { data, isLoading, isError } = useSocialListQuery();
  const { google, naver, kakao } = data || {};


  return (
    <div className="flex flex-col gap-2">
      <SocialAccountCard providerOb={google} provider="google"/>
      <SocialAccountCard providerOb={naver} provider="naver"/>
      <SocialAccountCard providerOb={kakao} provider="kakao"/>
    </div>
  )
}