"use client";

import Image from "next/image";
import { useState } from "react";
import { FileImage, ScanLine } from "lucide-react";
import { addDays } from "@/lib/dateUtils";
import type { FoodInput } from "@/lib/types";

const receiptSamples: FoodInput[] = [
  { name: "우유", category: "유제품", quantity: 1, price: 2800, purchaseDate: new Date(), expireDate: addDays(14), memo: "영수증 샘플" },
  { name: "계란", category: "기타", quantity: 10, price: 6900, purchaseDate: new Date(), expireDate: addDays(30), memo: "영수증 샘플" },
  { name: "두부", category: "가공식품", quantity: 1, price: 1800, purchaseDate: new Date(), expireDate: addDays(7), memo: "영수증 샘플" }
];

export default function ReceiptScanner({ onAnalyze }: { onAnalyze: (foods: FoodInput[]) => Promise<void> }) {
  const [preview, setPreview] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    try {
      await onAnalyze(receiptSamples);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-lg bg-white p-4 shadow-soft">
      <div className="flex items-center gap-2 font-bold">
        <FileImage className="h-5 w-5 text-leaf-600" />
        영수증 등록
      </div>
      <label className="mt-3 grid cursor-pointer place-items-center rounded-lg border border-dashed border-leaf-200 bg-leaf-50 p-5 text-sm font-semibold text-leaf-700">
        이미지 업로드
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
        />
      </label>
      {preview ? (
        <div className="relative mt-3 h-40 overflow-hidden rounded-lg">
          <Image src={preview} alt="영수증 미리보기" fill className="object-cover" />
        </div>
      ) : null}
      <button onClick={analyze} disabled={loading} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-bold text-white disabled:opacity-60">
        <ScanLine className="h-4 w-4" />
        {loading ? "분석 중" : "영수증 분석하기"}
      </button>
    </section>
  );
}
