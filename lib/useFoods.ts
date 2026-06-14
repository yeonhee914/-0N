"use client";

import { useEffect, useState } from "react";
import { subscribeFoods } from "./foodService";
import type { Food } from "./types";

export function useFoods(uid?: string) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    return subscribeFoods(uid, (nextFoods) => {
      setFoods(nextFoods);
      setLoading(false);
    });
  }, [uid]);

  return { foods, loading };
}
