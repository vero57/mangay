"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const searchParams = useSearchParams();
  const [showCreated, setShowCreated] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchParams && searchParams.get("created") === "1") {
      setShowCreated(true);
      setTimeout(() => setShowCreated(false), 3000);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, mode: "login" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Login gagal");
      } else {
        router.push("/");
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan.");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-white">
            Login
          </h1>
          <div className="mb-4">
            <label className="block mb-1 text-sm" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-sm" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
          {errorMsg && (
            <div className="mb-4 text-red-400 text-center">{errorMsg}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>
          <div className="mt-4 text-center text-sm">
            Belum punya akun?{" "}
            <a
              href="/auth/register"
              className="text-blue-400 hover:underline"
            >
              Register
            </a>
          </div>
        </form>
      </div>
      {showCreated && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg animate-fade-in">
          Account created
        </div>
      )}
    </div>
  );
};

export default LoginPage;
