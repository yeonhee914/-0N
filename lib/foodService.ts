import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { db } from "./firebase";
import type { Food, FoodInput } from "./types";

const foodsRef = (uid: string) => collection(db, "users", uid, "foods");

export function subscribeFoods(uid: string, callback: (foods: Food[]) => void) {
  return onSnapshot(query(foodsRef(uid), orderBy("expireDate", "asc")), (snapshot) => {
    callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Food));
  });
}

export async function addFood(uid: string, food: FoodInput) {
  return addDoc(foodsRef(uid), {
    ...food,
    purchaseDate: Timestamp.fromDate(food.purchaseDate),
    expireDate: Timestamp.fromDate(food.expireDate),
    createdAt: serverTimestamp()
  });
}

export async function updateFood(uid: string, foodId: string, food: FoodInput) {
  return setDoc(doc(db, "users", uid, "foods", foodId), {
    ...food,
    purchaseDate: Timestamp.fromDate(food.purchaseDate),
    expireDate: Timestamp.fromDate(food.expireDate)
  }, { merge: true });
}

export function deleteFood(uid: string, foodId: string) {
  return deleteDoc(doc(db, "users", uid, "foods", foodId));
}

export async function seedFoods(uid: string) {
  const snapshot = await getDocs(foodsRef(uid));
  if (!snapshot.empty) return;
  const today = new Date();
  const samples = [
    { name: "우유", category: "유제품", quantity: 1, price: 2800, days: 2 },
    { name: "계란", category: "기타", quantity: 10, price: 6900, days: 12 },
    { name: "양배추", category: "채소", quantity: 1, price: 3200, days: 6 },
    { name: "두부", category: "가공식품", quantity: 1, price: 1800, days: 1 }
  ] as const;
  await Promise.all(samples.map((item) => {
    const expireDate = new Date(today);
    expireDate.setDate(today.getDate() + item.days);
    return addFood(uid, {
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
      purchaseDate: today,
      expireDate,
      memo: "샘플 식재료"
    });
  }));
}
