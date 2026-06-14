"use client";

import { useEffect, useState } from "react";
import { Camera, Save } from "lucide-react";
import { addDays, dateInputValue, toDate } from "@/lib/dateUtils";
import { getRecommendedExpireDate } from "@/lib/foodDatabase";
import type { Food, FoodCategory, FoodInput } from "@/lib/types";
import { categories } from "./FilterBar";

const emptyFood = {
  name: "",
  category: "기타" as FoodCategory,
  quantity: 1,
  price: 0,
  purchaseDate: dateInputValue(new Date()),
  expireDate: dateInputValue(addDays(7)),
  memo: ""
};

export default function FoodForm({
  initialFood,
  onSubmit,
  submitLabel = "식재료 추가",
  onImageSelected
}: {
  initialFood?: Food | null;
  onSubmit: (food: FoodInput) => Promise<void>;
  submitLabel?: string;
  onImageSelected?: (file: File) => Promise<string>;
}) {
  const [form, setForm] = useState(emptyFood);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!initialFood) return;
    setForm({
      name: initialFood.name,
      category: initialFood.category,
      quantity: initialFood.quantity,
      price: initialFood.price,
      purchaseDate: dateInputValue(toDate(initialFood.purchaseDate)),
      expireDate: dateInputValue(toDate(initialFood.expireDate)),
      memo: initialFood.memo ?? ""
    });
    setImageUrl(initialFood.imageUrl);
  }, [initialFood]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    setForm((prev) => ({
      ...prev,
      name,
      expireDate: dateInputValue(getRecommendedExpireDate(name))
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        name: form.name.trim(),
        category: form.category,
        quantity: Number(form.quantity),
        price: Number(form.price),
        purchaseDate: new Date(form.purchaseDate),
        expireDate: new Date(form.expireDate),
        memo: form.memo.trim(),
        imageUrl
      });
      if (!initialFood) setForm(emptyFood);
    } finally {
      setSaving(false);
    }
  }

  async function handleImage(file?: File) {
    if (!file || !onImageSelected) return;
    setSaving(true);
    try {
      setImageUrl(await onImageSelected(file));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-lg bg-white p-4 shadow-soft">
      <label className="grid gap-1 text-sm font-semibold">
        식재료명
        <input required value={form.name} onChange={(event) => handleNameChange(event.target.value)} className="rounded-lg border px-3 py-2 font-normal outline-leaf-500" placeholder="예: 우유" />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1 text-sm font-semibold">
          카테고리
          <select value={form.category} onChange={(event) => update("category", event.target.value as FoodCategory)} className="rounded-lg border px-3 py-2 font-normal outline-leaf-500">
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          수량
          <input type="number" min="1" value={form.quantity} onChange={(event) => update("quantity", Number(event.target.value))} className="rounded-lg border px-3 py-2 font-normal outline-leaf-500" />
        </label>
      </div>
      <label className="grid gap-1 text-sm font-semibold">
        가격
        <input type="number" min="0" value={form.price} onChange={(event) => update("price", Number(event.target.value))} className="rounded-lg border px-3 py-2 font-normal outline-leaf-500" placeholder="원" />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1 text-sm font-semibold">
          구매일
          <input type="date" value={form.purchaseDate} onChange={(event) => update("purchaseDate", event.target.value)} className="rounded-lg border px-3 py-2 font-normal outline-leaf-500" />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          소비기한
          <input type="date" value={form.expireDate} onChange={(event) => update("expireDate", event.target.value)} className="rounded-lg border px-3 py-2 font-normal outline-leaf-500" />
        </label>
      </div>
      <label className="grid gap-1 text-sm font-semibold">
        메모
        <textarea value={form.memo} onChange={(event) => update("memo", event.target.value)} rows={3} className="resize-none rounded-lg border px-3 py-2 font-normal outline-leaf-500" placeholder="보관 위치, 특이사항" />
      </label>
      <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-leaf-100 bg-leaf-50 px-4 py-3 text-sm font-bold text-leaf-700">
        <Camera className="h-4 w-4" />
        사진 업로드
        <input type="file" accept="image/*" className="hidden" onChange={(event) => handleImage(event.target.files?.[0])} />
      </label>
      {imageUrl ? <p className="text-xs font-medium text-leaf-700">사진이 저장되었습니다.</p> : null}
      <button disabled={saving} className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-leaf-600 px-4 py-3 font-bold text-white disabled:opacity-60">
        <Save className="h-5 w-5" />
        {saving ? "저장 중" : submitLabel}
      </button>
    </form>
  );
}
