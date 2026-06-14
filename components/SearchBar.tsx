"use client";

import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-soft">
      <Search className="h-4 w-4 text-gray-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="식재료 검색"
        className="w-full bg-transparent text-sm outline-none"
      />
    </label>
  );
}
