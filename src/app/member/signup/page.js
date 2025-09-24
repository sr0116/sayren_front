import SignupForm from "@/components/auth/SignupForm";
import SocialAuthHandler from "@/app/providers/SocialAuthHandler";

export const revalidate = false;

export default async function SignupPage() {
  const [privacyRes, serviceRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/terms/privacy`, { cache: "force-cache" }),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/terms/service`, { cache: "force-cache" }),
  ]);

  const [privacyData, serviceData] = await Promise.all([
    privacyRes.json(),
    serviceRes.json(),
  ]);


  return (
    <div>
      <h2 className="text-center text-3xl font-medium mb-8">회원가입</h2>
      <div className="w-[400px] mx-auto rounded-lg p-6 border border-gray-200 bg-white">
        <SocialAuthHandler />
        <SignupForm initialPrivacy={privacyData} initialService={serviceData} />
      </div>
    </div>
  )

}