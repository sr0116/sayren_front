import SignupForm from "@/components/auth/SignupForm";

export const dynamic = "force-dynamic";

export default async function SignupNextPage({ params }) {
  const { token } = params;

  const [privacyRes, serviceRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/terms/privacy`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/terms/service`, {
      cache: "no-store",
    }),
  ]);

  const [privacyData, serviceData] = await Promise.all([
    privacyRes.json(),
    serviceRes.json(),
  ]);

  return (
      <SignupForm
          initialPrivacy={privacyData}
          initialService={serviceData}
          token={token}
      />
  );
}
