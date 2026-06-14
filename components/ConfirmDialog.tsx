"use client";

import { Trash2, X } from "lucide-react";

export default function ConfirmDialog({
  open,
  title,
  onCancel,
  onConfirm
}: {
  open: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-black/35 px-5">
      <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-soft">
        <p className="text-lg font-bold">{title}</p>
        <p className="mt-2 text-sm text-gray-500">삭제한 식재료는 다시 복구할 수 없습니다.</p>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onCancel} className="inline-flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-semibold">
            <X className="h-4 w-4" />
            취소
          </button>
          <button onClick={onConfirm} className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white">
            <Trash2 className="h-4 w-4" />
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
