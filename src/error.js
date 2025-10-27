'use client';

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white text-gray-800">
      <h1 className="text-6xl font-extrabold tracking-widest text-red-500 drop-shadow-sm">
        500
      </h1>
      <p className="mt-4 text-2xl font-semibold">서버 오류가 발생했습니다.</p>
      <p className="mt-2 text-gray-500">
        {error?.message || "일시적인 오류입니다. 잠시 후 다시 시도해주세요."}
      </p>

      <div className="mt-8">
        <button
          onClick={() => reset()}
          className="px-6 py-3 text-lg font-bold bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 hover:scale-105 transition-transform duration-300"
        >
          다시 시도
        </button>
      </div>

      <div className="absolute bottom-8 text-gray-400 text-sm tracking-widest">
        © {new Date().getFullYear()} SAYREN
      </div>
    </div>
  );
}

export const metadata = {
  title: "서버 오류 발생",
};
