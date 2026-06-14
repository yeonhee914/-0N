"use client";

import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/BottomNavigation";
import RecipeList from "@/components/RecipeList";
import { useAuth } from "@/components/AuthProvider";
import { useFoods } from "@/lib/useFoods";

export default function RecipesPage() {
  const { user } = useAuth();
  const { foods } = useFoods(user?.uid);

  return (
    <main className="page-shell">
      <AppHeader title="냉털 음식 추천" description="보유 식재료와 소비기한 임박 재료를 기준으로 추천합니다." />
      <RecipeList foods={foods} />
      <BottomNavigation />
    </main>
  );
}
