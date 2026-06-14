"use client";

import Link from "next/link";
import { useState } from "react";
import { Leaf, LogIn } from "lucide-react";
import { resetPassword, signIn } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await signIn(email, password);
    } catch {
      setMessage("이메일 또는 비밀번호를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  }

  async function reset() {
    if (!email) {
      setMessage("비밀번호 재설정을 위해 이메일을 입력해주세요.");
      return;
    }
    await resetPassword(email);
    setMessage("비밀번호 재설정 메일을 보냈습니다.");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-leaf-50 px-5">
      <form onSubmit={submit} className="w-full max-w-sm rounded-lg bg-white p-6 shadow-soft">
        <div className="mb-6 flex items-center gap-2">
          <Leaf className="h-8 w-8 text-leaf-600" />
          <div>
            <h1 className="text-2xl font-bold">냉장고ON</h1>
            <p className="text-sm text-gray-500">Food Keeper</p>
          </div>
        </div>
        <label className="grid gap-1 text-sm font-semibold">
          이메일
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="rounded-lg border px-3 py-2 font-normal outline-leaf-500" />
        </label>
        <label className="mt-3 grid gap-1 text-sm font-semibold">
          비밀번호
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="rounded-lg border px-3 py-2 font-normal outline-leaf-500" />
        </label>
        {message ? <p className="mt-3 text-sm font-medium text-red-600">{message}</p> : null}
        <button disabled={loading} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-leaf-600 px-4 py-3 font-bold text-white disabled:opacity-60">
          <LogIn className="h-5 w-5" />
          {loading ? "로그인 중" : "로그인"}
        </button>
        <div className="mt-4 flex items-center justify-between text-sm">
          <button type="button" onClick={reset} className="font-semibold text-gray-500">비밀번호 재설정</button>
          <Link href="/signup" className="font-bold text-leaf-700">회원가입</Link>
        </div>
      </form>
    </main>
  );
}
