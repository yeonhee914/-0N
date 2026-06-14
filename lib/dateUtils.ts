import type { Timestamp } from "firebase/firestore";

export function toDate(value?: Timestamp | Date | null) {
  if (!value) return new Date(0);
  return value instanceof Date ? value : value.toDate();
}

export function dateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function daysBetweenToday(date?: Timestamp | Date | null) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(toDate(date));
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / 86400000);
}

export function formatDate(value?: Timestamp | Date | null) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric"
  }).format(toDate(value));
}

export function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export function expiryTone(daysLeft: number) {
  if (daysLeft <= 3) return "danger";
  if (daysLeft <= 7) return "warning";
  return "fresh";
}
