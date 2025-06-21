"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type UserData = {
  username: string;
  full_name: string;
  email: string;
  profile_picture: string | null;
  created_at: string;
};

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export default function MyAccountPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("session_token");
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }
    fetch("/api/me", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.username) setUser(data);
        else window.location.href = "/auth/login";
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-pulse">Memuat profil...</div>
      </div>
    );
  }

  if (!user) return null;

  const usernameHandle = user.username.startsWith('@') 
    ? user.username 
    : `@${user.username.toLowerCase().replace(/\s+/g, '.')}`;

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="w-full px-0 py-8 md:py-16 flex justify-center flex-1">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Akun Saya</h1>
            <p className="text-gray-400 mt-2">Kelola informasi profil, dan pengaturan akun Anda.</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-lg p-6 md:p-10 w-full">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
              <div className="relative mb-4 md:mb-0 md:mr-6">
                {user.profile_picture ? (
                  <img 
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-500" 
                    src={user.profile_picture} 
                    alt="Foto Profil Pengguna"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://placehold.co/200x200/E2E8F0/4A5568?text=Error';
                    }}
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gray-700 border-4 border-blue-500 flex items-center justify-center text-4xl">
                    {user.full_name ? user.full_name.charAt(0).toUpperCase() : '?'}
                  </div>
                )}
                <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-green-500 border-2 border-slate-800"></span>
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-white">
                  {user.full_name || user.username}
                </h2>
                <p className="text-gray-400">{usernameHandle}</p>
              </div>
            </div>
            <hr className="my-8 border-t border-slate-700" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Informasi Kontak</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/70 p-4 rounded-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-3">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-medium">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row justify-end gap-3">
              <button className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 transition-colors duration-200 text-white font-semibold py-2 px-5 rounded-lg">
                Ubah Kata Sandi
              </button>
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-bold py-2 px-5 rounded-lg">
                Edit Profil
              </button>
            </div>
          </div>
          <div className="text-center mt-6">
            <button 
              onClick={() => {
                document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = "/auth/login";
              }}
              className="text-red-500 hover:text-red-400 transition-colors duration-200 text-sm font-medium"
            >
              Keluar dari Akun
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}