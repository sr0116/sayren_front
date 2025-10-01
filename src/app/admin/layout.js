import AdminMenu from "@/components/admin/AdminMenu";

export default function AdminRayOut({children}) {
  return(
    <div className="w-full flex flex-col md:flex-row gap-6 px-6">
      {/* 왼쪽 메뉴 영역 */}
      <aside className="w-full md:w-60 shrink-0">
        <h2 className="text-xl font-bold mb-6 text-gray-800">관리자 메뉴</h2>
        <AdminMenu />
      </aside>

      {/* 오른쪽 컨텐츠 영역 */}
      <section className="flex-grow border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
        {children}
      </section>
    </div>
  )
}