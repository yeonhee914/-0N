import type { Timestamp } from "firebase/firestore";

export type FoodCategory = "채소" | "과일" | "육류" | "유제품" | "가공식품" | "기타";

export type Food = {
  id: string;
  name: string;
  category: FoodCategory;
  quantity: number;
  price: number;
  purchaseDate: Timestamp;
  expireDate: Timestamp;
  createdAt: Timestamp;
  memo?: string;
  imageUrl?: string;
};

export type FoodInput = Omit<Food, "id" | "createdAt" | "purchaseDate" | "expireDate"> & {
  purchaseDate: Date;
  expireDate: Date;
};

export type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
  category: string;
  minutes: number;
  tip: string;
};

export type RecipeMatch = Recipe & {
  matchRate: number;
  ownedIngredients: string[];
  missingIngredients: string[];
  urgentIngredientCount: number;
};
