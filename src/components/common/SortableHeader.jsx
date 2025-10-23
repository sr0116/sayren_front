import {useSearchParams} from "next/navigation";
import {ChevronDown, ChevronUp} from "lucide-react";
import Link from "next/link";

export default function SortableHeader({ column, label }) {
  const searchParams = useSearchParams();

  const currentSortBy = searchParams.get("sortBy");
  const currentDirection = searchParams.get("direction") || "asc";

  // 클릭 시 토글 (asc <-> desc)
  const nextDirection =
      currentSortBy === column && currentDirection === "asc" ? "desc" : "asc";

  const params = new URLSearchParams(searchParams.toString());
  params.set("sortBy", column);
  params.set("direction", nextDirection);

  return (
      <Link
          href={`?${params.toString()}`}
          scroll={false}
          className="flex items-center space-x-1 hover:underline"
      >
        <span>{label}</span>
        {/* 정렬 아이콘 표시 */}
        {currentSortBy === column && (
            currentDirection === "asc" ? (
                <ChevronUp size={14} />
            ) : (
                <ChevronDown size={14} />
            )
        )}
      </Link>
  );
}