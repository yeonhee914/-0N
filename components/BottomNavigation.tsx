"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Home, PlusCircle, Refrigerator, UserRound, Utensils } from "lucide-react";

const tabs = [
  { href: "/", label: "홈", icon: Home },
  { href: "/add", label: "등록", icon: PlusCircle },
  { href: "/foods", label: "식재료", icon: Refrigerator },
  { href: "/recipes", label: "레시피", icon: Utensils },
  { href: "/stats", label: "통계", icon: BarChart3 },
  { href: "/profile", label: "마이", icon: UserRound }
];

export default function BottomNavigation() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-leaf-100 bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-3xl grid-cols-6">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium ${
                active ? "text-leaf-700" : "text-gray-400"
              }`}
              title={label}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
