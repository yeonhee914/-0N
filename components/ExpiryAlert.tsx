import { AlertTriangle } from "lucide-react";
import { daysBetweenToday } from "@/lib/dateUtils";
import type { Food } from "@/lib/types";

export default function ExpiryAlert({ foods }: { foods: Food[] }) {
  const urgent = foods.filter((food) => daysBetweenToday(food.expireDate) <= 3).slice(0, 4);
  if (!urgent.length) return null;
  return (
    <section className="rounded-lg border border-red-100 bg-red-50 p-4">
      <div className="flex items-center gap-2 font-bold text-red-700">
        <AlertTriangle className="h-5 w-5" />
        소비기한 임박
      </div>
      <div className="mt-3 grid gap-2">
        {urgent.map((food) => (
          <p key={food.id} className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-red-700">
            {food.name} {daysBetweenToday(food.expireDate)}일 남음
          </p>
        ))}
      </div>
    </section>
  );
}
