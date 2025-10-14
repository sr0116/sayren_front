export default function ErrorState({ message = "데이터를 불러오지 못했습니다." }) {
  return (
      <div className="flex justify-center items-center h-40 text-red-500 text-sm">
        {message}
      </div>
  );
}