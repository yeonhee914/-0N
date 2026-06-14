"use client";

import { useMemo, useState } from "react";
import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/BottomNavigation";
import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import FilterBar from "@/components/FilterBar";
import FoodCard from "@/components/FoodCard";
import FoodForm from "@/components/FoodForm";
import SearchBar from "@/components/SearchBar";
import { useAuth } from "@/components/AuthProvider";
import { deleteFood, updateFood } from "@/lib/foodService";
import { useFoods } from "@/lib/useFoods";
import { toDate } from "@/lib/dateUtils";
import { uploadFoodImage } from "@/lib/storageService";
import type { Food, FoodCategory } from "@/lib/types";

export default function FoodsPage() {
  const { user } = useAuth();
  const { foods } = useFoods(user?.uid);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"전체" | FoodCategory>("전체");
  const [sort, setSort] = useState<"created" | "expiry" | "name">("expiry");
  const [deleting, setDeleting] = useState<Food | null>(null);
  const [editing, setEditing] = useState<Food | null>(null);

  const filtered = useMemo(() => {
    return foods
      .filter((food) => food.name.includes(search))
      .filter((food) => category === "전체" || food.category === category)
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name, "ko");
        if (sort === "created") return toDate(b.createdAt).getTime() - toDate(a.createdAt).getTime();
        return toDate(a.expireDate).getTime() - toDate(b.expireDate).getTime();
      });
  }, [foods, search, category, sort]);

  return (
    <main className="page-shell">
      <AppHeader title="식재료 목록" description="소비기한이 임박한 식재료가 먼저 보입니다." />
      <div className="mb-4 grid gap-2 md:grid-cols-[1fr_320px]">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar category={category} sort={sort} onCategoryChange={setCategory} onSortChange={setSort} />
      </div>
      {filtered.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {filtered.map((food) => (
            <FoodCard key={food.id} food={food} onDelete={setDeleting} onEdit={setEditing} />
          ))}
        </div>
      ) : (
        <EmptyState title="조건에 맞는 식재료가 없어요" description="검색어나 필터를 바꿔보세요." />
      )}
      {editing ? (
        <div className="fixed inset-0 z-30 overflow-y-auto bg-black/35 p-5">
          <div className="mx-auto max-w-xl">
            <FoodForm
              initialFood={editing}
              submitLabel="수정 저장"
              onImageSelected={(file) => user ? uploadFoodImage(user.uid, file) : Promise.resolve("")}
              onSubmit={async (food) => {
                if (user) await updateFood(user.uid, editing.id, food);
                setEditing(null);
              }}
            />
            <button onClick={() => setEditing(null)} className="mt-3 w-full rounded-lg bg-white px-4 py-3 font-bold">닫기</button>
          </div>
        </div>
      ) : null}
      <ConfirmDialog
        open={Boolean(deleting)}
        title={`${deleting?.name ?? ""} 삭제`}
        onCancel={() => setDeleting(null)}
        onConfirm={async () => {
          if (user && deleting) await deleteFood(user.uid, deleting.id);
          setDeleting(null);
        }}
      />
      <BottomNavigation />
    </main>
  );
}
