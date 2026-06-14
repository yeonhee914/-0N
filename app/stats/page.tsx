"use client";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/BottomNavigation";
import StatsCard from "@/components/StatsCard";
import { useAuth } from "@/components/AuthProvider";
import { useFoods } from "@/lib/useFoods";
import { daysBetweenToday, toDate } from "@/lib/dateUtils";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function StatsPage() {
  const { user } = useAuth();
  const { foods } = useFoods(user?.uid);
  const totalPrice = foods.reduce((sum, food) => sum + food.price, 0);
  const urgent = foods.filter((food) => daysBetweenToday(food.expireDate) <= 3).length;
  const categories = ["채소", "과일", "육류", "유제품", "가공식품", "기타"];
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index));
    return `${date.getMonth() + 1}월`;
  });

  const categoryData = {
    labels: categories,
    datasets: [{
      data: categories.map((category) => foods.filter((food) => food.category === category).length),
      backgroundColor: ["#31a65b", "#f59e0b", "#ef4444", "#60a5fa", "#a78bfa", "#94a3b8"],
      borderWidth: 0
    }]
  };

  const monthData = {
    labels: months,
    datasets: [{
      label: "등록 수",
      data: months.map((label) => foods.filter((food) => `${toDate(food.createdAt).getMonth() + 1}월` === label).length),
      backgroundColor: "#31a65b",
      borderRadius: 6
    }]
  };

  return (
    <main className="page-shell">
      <AppHeader title="냉장고 통계" description="재고, 임박 식재료, 카테고리별 비율을 확인하세요." />
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3">
        <StatsCard label="총 식재료 수" value={foods.length} />
        <StatsCard label="임박 식재료" value={urgent} tone={urgent ? "red" : "green"} />
        <StatsCard label="총가격" value={`${totalPrice.toLocaleString()}원`} tone="plain" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <section className="rounded-lg bg-white p-4 shadow-soft">
          <h2 className="mb-4 font-bold">카테고리별 비율</h2>
          <Doughnut data={categoryData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
        </section>
        <section className="rounded-lg bg-white p-4 shadow-soft">
          <h2 className="mb-4 font-bold">월별 등록 수</h2>
          <Bar data={monthData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } }} />
        </section>
      </div>
      <BottomNavigation />
    </main>
  );
}
