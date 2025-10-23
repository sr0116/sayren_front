import React from "react";
import ResetPwForm from "@/components/member/ResetPwForm";


export default function ResetPasswordPage({ params }){
  const { token } = params;


  return (
    <ResetPwForm token={token}/>
  )
}