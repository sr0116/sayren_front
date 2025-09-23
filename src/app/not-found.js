import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white text-gray-800">
      <h1 className="text-7xl font-extrabold tracking-widest text-primary drop-shadow-sm">
        404
      </h1>
      <p className="mt-4 text-2xl font-semibold">페이지를 찾을 수 없습니다.</p>
      <p className="mt-2 text-gray-500">
        요청하신 페이지가 존재하지 않거나 삭제되었어요.
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="px-6 py-3 text-lg font-bold bg-primary text-white rounded-full shadow-md hover:bg-primary-dark hover:scale-105 transition-transform duration-300"
        >
          메인으로 돌아가기
        </Link>
      </div>

      <div className="absolute bottom-8 text-gray-400 text-sm tracking-widest">
        © {new Date().getFullYear()} SAYREN
      </div>
    </div>
  );
}


export const metadata = {
  title: "페이지를 찾을 수 없습니다.",
};

