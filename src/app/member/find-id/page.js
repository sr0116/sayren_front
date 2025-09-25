import FindIdForm from "@/components/member/FindIdForm";

export default function FindIdPage() {
  return (
      <div>
        <h2 className="text-center text-3xl font-medium mb-8">아이디 찾기</h2>
        <div className="w-[400px] mx-auto rounded-lg p-6 border border-gray-200 bg-white">
          <FindIdForm />
        </div>
      </div>
  )
}