"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const SearchResultPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams?.get("keyword") || "";
  const [mangaList, setMangaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/manga")
      .then((res) => res.json())
      .then((data) => {
        setMangaList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredManga =
    keyword.trim() === ""
      ? []
      : mangaList.filter((m) =>
          m.title?.toLowerCase().includes(keyword.trim().toLowerCase())
        );

  return (
    <>
      <style jsx>{`
        .hover-effect {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `}</style>
      <div className="bg-gray-900 text-gray-200 font-sans min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-1">
          <h1 className="text-3xl font-bold mb-6 text-white text-center">
            Hasil Pencarian: <span className="text-blue-400">{keyword}</span>
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {loading ? (
              <div className="col-span-full text-center">Loading...</div>
            ) : filteredManga.length === 0 ? (
              <div className="col-span-full text-center">
                Tidak ada manga yang ditemukan.
              </div>
            ) : (
              filteredManga.map((manga) => (
                <a key={manga.id} href="#" className="group hover-effect">
                  <div className="aspect-[2/3] bg-gray-800 rounded-md overflow-hidden relative">
                    <img
                      src={
                        manga.cover_url ||
                        "https://placehold.co/300x450/374151/e5e7eb?text=No+Cover"
                      }
                      alt={`Cover ${manga.title}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-black/50 text-white text-xs px-2 py-1 rounded-tr-md rounded-bl-md">
                      {manga.status}
                    </div>
                  </div>
                  <h3 className="font-semibold mt-2 group-hover:text-blue-400">
                    {manga.title}
                  </h3>
                </a>
              ))
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SearchResultPage;
