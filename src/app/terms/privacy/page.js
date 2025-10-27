export const dynamic = "force-dynamic";
import dayjs from "dayjs";

export const revalidate = 0;

export default async function PrivacyPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/terms/privacy`);

  if (!res.ok) {
    return (
      <div>
        <h1 className="text-center mb-16 font-semibold text-2xl">개인정보 처리방침</h1>
        <p>개인정보 처리방침을 불러올 수 없습니다.</p>
      </div>
    );
  }

  const data = await res.json();

  return (
    <div>
      <div className="mb-4">[{dayjs(data.regDate).format("YYYY년 MM월 DD일")} 개정]</div>
      <h1 className="text-center mb-16 font-semibold text-2xl">개인정보 처리방침</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
}
