"use client";

import { useEffect, useState } from "react";

type UserData = {
  username: string;
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
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <div className="mb-4">
          {user.profile_picture ? (
            <img
              src={user.profile_picture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl">
              ?
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold mb-2">{user.username}</h2>
        <div className="mb-1 text-gray-300">{user.email}</div>
        <div className="mb-1 text-gray-400 text-sm">
          Joined: {new Date(user.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
