"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "firebase/auth";
import { listenAuth } from "@/lib/auth";
import { seedFoods } from "@/lib/foodService";
import LoadingSpinner from "./LoadingSpinner";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true });
const publicPaths = ["/login", "/signup"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    return listenAuth(async (nextUser) => {
      setUser(nextUser);
      setLoading(false);
      if (nextUser) {
        await seedFoods(nextUser.uid);
        if (publicPaths.includes(pathname)) router.replace("/");
      } else if (!publicPaths.includes(pathname)) {
        router.replace("/login");
      }
    });
  }, [pathname, router]);

  const value = useMemo(() => ({ user, loading }), [user, loading]);

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center">
        <LoadingSpinner label="냉장고를 여는 중" />
      </main>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
