export const dynamic = "force-dynamic";
import dayjs from "dayjs";

export const revalidate = 0;

export default async function ServicePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/terms/service`);

  if (!res.ok) {
    return (
      <div>
        <h1 className="text-center mb-16 font-semibold text-2xl">서비스 이용약관</h1>
        <p>서비스 이용약관을 불러올 수 없습니다.</p>
      </div>
    );
  }

  const data = await res.json();

  return (
    <div>
      <div className="mb-4">[{dayjs(data.regDate).format("YYYY년 MM월 DD일")} 개정]</div>
      <h1 className="text-center mb-16 font-semibold text-2xl">서비스 이용약관</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
}
