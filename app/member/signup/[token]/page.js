import SignupForm from "@/components/auth/SignupForm";
import React from "react";

export const revalidate = false;

export default async function SignupNextPage({params}) {
  const { token } = params;
  const [privacyRes, serviceRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/terms/privacy`, { cache: "force-cache" }),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/terms/service`, { cache: "force-cache" }),
  ]);

  const [privacyData, serviceData] = await Promise.all([
    privacyRes.json(),
    serviceRes.json(),
  ]);

  return (
    <SignupForm initialPrivacy={privacyData} initialService={serviceData} token={token} />
  )
}