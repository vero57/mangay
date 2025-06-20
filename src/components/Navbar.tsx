import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/Search-Result?keyword=${encodeURIComponent(search.trim())}`);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    const token = getCookie("session_token");
    setIsLoggedIn(!!token);
    if (token) {
      fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.profile_picture) setProfilePic(data.profile_picture);
          else setProfilePic(null);
        });
    } else {
      setProfilePic(null);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "session_token=; Max-Age=0; path=/";
    setIsLoggedIn(false);
    window.location.href = "/auth/login";
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700/50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex justify-between items-center">
          {/* Logo Website */}
          <a href="/" className="text-2xl font-bold text-white">
            Man<span className="text-pink-500">gay</span>
          </a>

          {/* Menu Nav + Search + User Icon */}
          <div className="flex items-center space-x-4">
            {/* Menu Nav */}
            <ul className="hidden md:flex items-center space-x-6">
              <li>
                <a
                  href="/"
                  className={`hover:text-blue-400 transition-colors ${
                    pathname === "/" ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="/manga-list"
                  className={`hover:text-blue-400 transition-colors ${
                    pathname === "/manga-list" ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Daftar Manga
                </a>
              </li>
              <li>
                <a
                  href="/genre"
                  className={`hover:text-blue-400 transition-colors ${
                    pathname === "/genre" ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Genre
                </a>
              </li>
              <li>
                <a
                  href="/author"
                  className={`hover:text-blue-400 transition-colors ${
                    pathname === "/author" ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Author
                </a>
              </li>
              <li>
                <a
                  href="/schedule"
                  className={`hover:text-blue-400 transition-colors ${
                    pathname === "/schedule" ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Jadwal Rilis
                </a>
              </li>
              <li>
                <a
                  href="/manguys"
                  className={`hover:text-blue-400 transition-colors ${
                    pathname === "/manguys" ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Join Manguys
                </a>
              </li>
            </ul>

            {/* Search bar */}
            <form
              className="relative hidden sm:block"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <input
                type="text"
                placeholder="Cari manga..."
                className="bg-gray-800 border border-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 md:w-64 transition-all"
                value={search}
                onChange={handleInput}
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </form>

            {/* Icon User + Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="ml-2 p-2 rounded-full hover:bg-gray-800 transition-colors"
                onClick={() => setShowDropdown((v) => !v)}
                type="button"
              >
                {isLoggedIn && profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-blue-500"
                  />
                ) : (
                  <svg
                    className="w-7 h-7 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.25a7.25 7.25 0 0 1 15 0v.25a.75.75 0 0 1-.75.75h-13.5a.75.75 0 0 1-.75-.75v-.25Z"
                    />
                  </svg>
                )}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded shadow-lg border border-gray-700 z-50">
                  {isLoggedIn ? (
                    <>
                      <a
                        href="/My-Account"
                        className="block px-4 py-2 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        My Profile
                      </a>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                        type="button"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/auth/login"
                        className="block px-4 py-2 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        Login
                      </a>
                      <a
                        href="/auth/register"
                        className="block px-4 py-2 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        Register
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Tombol Menu (Untuk Mobile) */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-800">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
