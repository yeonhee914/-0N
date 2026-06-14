"use client";

import Link from "next/link";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { signUp } from "@/lib/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await signUp(email, password);
    } catch {
      setMessage("회원가입에 실패했습니다. 이메일 형식과 비밀번호 6자 이상을 확인해주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-leaf-50 px-5">
      <form onSubmit={submit} className="w-full max-w-sm rounded-lg bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-bold">회원가입</h1>
        <p className="mt-1 text-sm text-gray-500">가입 후 자동 로그인 상태가 유지됩니다.</p>
        <label className="mt-6 grid gap-1 text-sm font-semibold">
          이메일
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="rounded-lg border px-3 py-2 font-normal outline-leaf-500" />
        </label>
        <label className="mt-3 grid gap-1 text-sm font-semibold">
          비밀번호
          <input type="password" value={password} minLength={6} onChange={(event) => setPassword(event.target.value)} required className="rounded-lg border px-3 py-2 font-normal outline-leaf-500" />
        </label>
        {message ? <p className="mt-3 text-sm font-medium text-red-600">{message}</p> : null}
        <button disabled={loading} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-leaf-600 px-4 py-3 font-bold text-white disabled:opacity-60">
          <UserPlus className="h-5 w-5" />
          {loading ? "가입 중" : "가입하기"}
        </button>
        <Link href="/login" className="mt-4 block text-center text-sm font-bold text-leaf-700">이미 계정이 있어요</Link>
      </form>
    </main>
  );
}
