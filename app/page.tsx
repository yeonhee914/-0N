"use client";

import Link from "next/link";
import { Plus, Utensils } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/BottomNavigation";
import EmptyState from "@/components/EmptyState";
import ExpiryAlert from "@/components/ExpiryAlert";
import FoodCard from "@/components/FoodCard";
import RecipeList from "@/components/RecipeList";
import StatsCard from "@/components/StatsCard";
import { useAuth } from "@/components/AuthProvider";
import { deleteFood } from "@/lib/foodService";
import { useFoods } from "@/lib/useFoods";
import { daysBetweenToday, toDate } from "@/lib/dateUtils";

export default function HomePage() {
  const { user } = useAuth();
  const { foods } = useFoods(user?.uid);
  const urgent = foods.filter((food) => daysBetweenToday(food.expireDate) <= 3).length;
  const oldest = [...foods].sort((a, b) => toDate(a.purchaseDate).getTime() - toDate(b.purchaseDate).getTime())[0];
  const latest = [...foods].sort((a, b) => toDate(b.createdAt).getTime() - toDate(a.createdAt).getTime())[0];
  const totalPrice = foods.reduce((sum, food) => sum + food.price, 0);

  return (
    <main className="page-shell">
      <AppHeader title="오늘의 냉장고" description="현재 식재료와 소비기한을 한눈에 확인하세요." />
      <section className="mb-5 rounded-lg bg-leaf-600 p-5 text-white shadow-soft">
        <p className="text-sm font-semibold opacity-85">오늘의 음식 추천</p>
        <div className="mt-3">
          <RecipeList foods={foods.filter((food) => daysBetweenToday(food.expireDate) <= 3)} limit={1} />
        </div>
      </section>
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatsCard label="총 식재료" value={foods.length} />
        <StatsCard label="임박 식재료" value={urgent} tone={urgent ? "red" : "green"} />
        <StatsCard label="총가격" value={`${totalPrice.toLocaleString()}원`} tone="plain" />
        <StatsCard label="최근 등록" value={latest?.name ?? "-"} tone="yellow" />
      </div>
      <ExpiryAlert foods={foods} />
      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">현재 식재료</h2>
          <span className="text-xs text-gray-500">오래된 재료: {oldest?.name ?? "-"}</span>
        </div>
        {foods.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {foods.slice(0, 6).map((food) => (
              <FoodCard key={food.id} food={food} onDelete={(target) => user && deleteFood(user.uid, target.id)} />
            ))}
          </div>
        ) : (
          <EmptyState title="냉장고가 비어 있어요" description="식재료를 추가하면 소비기한 관리가 시작됩니다." />
        )}
        <Link href="/add" className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-leaf-600 px-5 py-3 font-bold text-white shadow-soft">
          <Plus className="h-5 w-5" />
          식재료 추가
        </Link>
      </section>
      <Link href="/recipes" className="fixed bottom-24 right-5 z-10 grid h-14 w-14 place-items-center rounded-full bg-gray-950 text-white shadow-soft" title="음식 추천">
        <Utensils className="h-6 w-6" />
      </Link>
      <BottomNavigation />
    </main>
  );
}
