"use client";

import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/BottomNavigation";
import FoodForm from "@/components/FoodForm";
import ReceiptScanner from "@/components/ReceiptScanner";
import { useAuth } from "@/components/AuthProvider";
import { addFood } from "@/lib/foodService";
import { uploadFoodImage } from "@/lib/storageService";

export default function AddPage() {
  const { user } = useAuth();

  return (
    <main className="page-shell">
      <AppHeader title="식재료 등록" description="이름을 입력하면 기본 소비기한이 자동 추천됩니다." />
      <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
        <FoodForm
          onSubmit={async (food) => {
            if (user) await addFood(user.uid, food);
          }}
          onImageSelected={(file) => user ? uploadFoodImage(user.uid, file) : Promise.resolve("")}
        />
        <ReceiptScanner
          onAnalyze={async (foods) => {
            if (!user) return;
            await Promise.all(foods.map((food) => addFood(user.uid, food)));
          }}
        />
      </div>
      <BottomNavigation />
    </main>
  );
}
