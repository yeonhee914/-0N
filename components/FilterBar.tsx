"use client";

import type { FoodCategory } from "@/lib/types";

export const categories: FoodCategory[] = ["채소", "과일", "육류", "유제품", "가공식품", "기타"];

export default function FilterBar({
  category,
  sort,
  onCategoryChange,
  onSortChange
}: {
  category: "전체" | FoodCategory;
  sort: "created" | "expiry" | "name";
  onCategoryChange: (value: "전체" | FoodCategory) => void;
  onSortChange: (value: "created" | "expiry" | "name") => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value as "전체" | FoodCategory)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-soft outline-none"
      >
        <option>전체</option>
        {categories.map((item) => <option key={item}>{item}</option>)}
      </select>
      <select
        value={sort}
        onChange={(event) => onSortChange(event.target.value as "created" | "expiry" | "name")}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-soft outline-none"
      >
        <option value="expiry">소비기한순</option>
        <option value="created">등록순</option>
        <option value="name">이름순</option>
      </select>
    </div>
  );
}
