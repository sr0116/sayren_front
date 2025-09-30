"use client";

export default function Pagination({ data }) {
  const { page, size, totalPages, totalElements, hasPrev, hasNext } = data;

    return (
        <div className="flex items-center justify-center space-x-1 mt-6">
            {/* 처음으로 */}
            <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className={`px-3 py-1 border rounded ${
                    page === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                }`}
            >
                «
            </button>

            {/* 이전 */}
            <button
                onClick={() => setPage(page - 1)}
                disabled={!prev}
                className={`px-3 py-1 border rounded ${
                    !prev
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                }`}
            >
                ‹
            </button>

            {/* 페이지 번호 */}
            {pageList.map((num) => (
                <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`px-3 py-1 border-b-2 ${
                        num === page
                            ? "border-[#ff0066] text-[#ff0066] font-bold"
                            : "border-transparent text-gray-600 hover:border-gray-400"
                    }`}
                >
                    {num}
                </button>
            ))}

            {/* 다음 */}
            <button
                onClick={() => setPage(page + 1)}
                disabled={!next}
                className={`px-3 py-1 border rounded ${
                    !next
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                }`}
            >
                ›
            </button>

            {/* 마지막으로 */}
            <button
                onClick={() => setPage(pageList[pageList.length - 1])}
                disabled={page === pageList[pageList.length - 1]}
                className={`px-3 py-1 border rounded ${
                    page === pageList[pageList.length - 1]
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                }`}
            >
                »
            </button>
        </div>
    );
}
