"use client";

import Link from "next/link";
import SortableHeader from "@/components/common/SortableHeader";


export default function MemberTable({members}) {


  return (
      <div className="w-full">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">
                <SortableHeader column="email" label="이메일" />
              </th>
              <th className="px-4 py-2 border-b">
                <SortableHeader column="name" label="이름" />
              </th>
              <th className="px-4 py-2 border-b">
                <SortableHeader column="tel" label="전화번호" />
              </th>
              <th className="px-4 py-2 border-b">
                <SortableHeader column="status" label="상태" />
              </th>
              <th className="px-4 py-2 border-b">
                <SortableHeader column="roles" label="권한" />
              </th>
            </tr>
            </thead>
            <tbody>
            {members.map((m) => (
                <tr key={m.id}>
                  <td className="px-4 py-2 border-b">
                    <Link href={`/admin/member/detail/${m.id}`} className="hover:underline">
                      {m.email}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border-b">{m.name}</td>
                  <td className="px-4 py-2 border-b">
                    {m.tel || <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-4 py-2 border-b">
                  <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                          m.status === "ACTIVE"
                              ? "bg-green-600 text-white"
                              : m.status === "READY"
                                  ? "bg-yellow-600 text-white"
                                  : "bg-gray-600 text-white"
                      }`}
                  >
                    {m.status}
                  </span>
                  </td>
                  <td className="px-4 py-2 border-b">{m.roles.join(", ")}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden space-y-4">
          {members.map((m) => (
              <div
                  key={m.id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
              >

                <p className="text-sm text-gray-500">이메일</p>
                <p className="mb-2 break-all">{m.email}</p>

                <p className="text-sm text-gray-500">이름</p>
                <p className="mb-2">{m.name}</p>

                <p className="text-sm text-gray-500">전화번호</p>
                <p className="mb-2">{m.tel || <span className="text-gray-400">-</span>}</p>

                <p className="text-sm text-gray-500">상태</p>
                <p
                    className={`mb-2 font-medium ${
                        m.status === "ACTIVE"
                            ? "text-green-600"
                            : m.status === "READY"
                                ? "text-yellow-600"
                                : "text-gray-600"
                    }`}
                >
                  {m.status}
                </p>

                <p className="text-sm text-gray-500">권한</p>
                <p>{m.roles.join(", ")}</p>
              </div>
          ))}
        </div>
      </div>
  );
}
