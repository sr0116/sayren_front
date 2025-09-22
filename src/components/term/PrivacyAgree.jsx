import {CheckBox} from "@/components/common/Input";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getPrivacyTerms() {
  const { data } = await axios.get("/api/terms/privacy");
  return data;
}


export default function PrivacyAgree({ onChange , checked , size , name }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["terms", "privacy"],
    queryFn: getPrivacyTerms,
    staleTime: Infinity,
  });

  return (
    <div className="space-y-2">
      <CheckBox onChange={onChange} checked={checked} name={name} label={
        <span className="text-sm font-semibold text-gray-800">
              <span className="text-primary">[필수]</span> 개인정보 처리방침
            </span>
      }/>
      <div className={`border rounded-md bg-gray-50 max-h-36 overflow-y-auto text-gray-600 leading-relaxed p-3 ${"text-" + size}`}>
        { (isLoading || isError) ? (<p>로딩중...</p>) : <div dangerouslySetInnerHTML={{ __html: data?.content }} />}
      </div>
    </div>
  )
}