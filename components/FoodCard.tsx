"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { daysBetweenToday, expiryTone, formatDate } from "@/lib/dateUtils";
import type { Food } from "@/lib/types";

export default function FoodCard({
  food,
  onDelete,
  onEdit
}: {
  food: Food;
  onDelete: (food: Food) => void;
  onEdit?: (food: Food) => void;
}) {
  const daysLeft = daysBetweenToday(food.expireDate);
  const tone = expiryTone(daysLeft);
  const badge = tone === "danger" ? "bg-red-100 text-red-700" : tone === "warning" ? "bg-amber-100 text-amber-700" : "bg-leaf-100 text-leaf-700";

  return (
    <article className="flex gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-soft">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-leaf-50">
        {food.imageUrl ? (
          <Image src={food.imageUrl} alt={food.name} fill className="object-cover" sizes="80px" />
        ) : (
          <div className="grid h-full place-items-center text-xs font-semibold text-leaf-600">{food.category}</div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-bold text-gray-950">{food.name}</h3>
            <p className="mt-0.5 text-xs text-gray-500">{food.category} · 수량 {food.quantity}</p>
          </div>
          <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-bold ${badge}`}>
            {daysLeft < 0 ? `${Math.abs(daysLeft)}일 지남` : `${daysLeft}일 남음`}
          </span>
        </div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="text-xs text-gray-500">
            <p>소비기한 {formatDate(food.expireDate)}</p>
            <p className="font-semibold text-gray-700">{food.price.toLocaleString()}원</p>
          </div>
          <div className="flex gap-1">
            {onEdit ? (
              <button onClick={() => onEdit(food)} className="rounded-lg border p-2 text-gray-500" title="수정">
                <Pencil className="h-4 w-4" />
              </button>
            ) : null}
            <button onClick={() => onDelete(food)} className="rounded-lg border p-2 text-red-500" title="삭제">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
