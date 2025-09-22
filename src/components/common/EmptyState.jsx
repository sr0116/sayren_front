"use client";

import { Inbox } from "lucide-react";
import Button from "@/components/common/Button";

// 데이터가 없을 때 안내 UI
export default function EmptyState({title = "데이터가 없습니다", message, actionLabel, onAction}) {
  return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        {/* 아이콘 (회색톤) */}
        <div className="rounded-full bg-gray-100 p-4">
          <Inbox className="w-10 h-10 text-gray-400" />
        </div>

        {/* 메인 메시지 */}
        <h3 className="mt-4 text-lg font-semibold text-gray-700">
          {title}
        </h3>

        {/* 서브 메시지 */}
        {message && (
            <p className="mt-2 text-sm text-gray-500 max-w-md">
              {message}
            </p>
        )}

        {/* 액션 버튼 */}
        {actionLabel && onAction && (
            <Button
                variant="primary"
                onClick={onAction}
                className="mt-6 w-auto px-6">
              {actionLabel}
            </Button>
        )}
      </div>
  );
}
