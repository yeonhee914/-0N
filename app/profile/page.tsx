"use client";

import { Mail, Power, UserRound } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/BottomNavigation";
import StatsCard from "@/components/StatsCard";
import { useAuth } from "@/components/AuthProvider";
import { logOut } from "@/lib/auth";
import { useFoods } from "@/lib/useFoods";

export default function ProfilePage() {
  const { user } = useAuth();
  const { foods } = useFoods(user?.uid);

  return (
    <main className="page-shell">
      <AppHeader title="마이페이지" description="계정 정보와 등록 식재료 수를 확인합니다." />
      <section className="rounded-lg bg-white p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-leaf-100 text-leaf-700">
            <UserRound className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-bold">{user?.email}</p>
            <p className="text-sm text-gray-500">가입일 {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString("ko-KR") : "-"}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <StatsCard label="등록 식재료" value={foods.length} />
          <StatsCard label="로그인 방식" value="이메일" tone="plain" />
        </div>
        <div className="mt-5 rounded-lg bg-leaf-50 p-4 text-sm text-leaf-700">
          <p className="inline-flex items-center gap-2 font-bold">
            <Mail className="h-4 w-4" />
            인증 상태 유지
          </p>
          <p className="mt-1">한 번 로그인하면 브라우저에 로그인 상태가 유지됩니다.</p>
        </div>
        <button onClick={logOut} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 font-bold text-white">
          <Power className="h-5 w-5" />
          로그아웃
        </button>
      </section>
      <BottomNavigation />
    </main>
  );
}
