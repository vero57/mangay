"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const DaftarManga = () => {
  const [mangaList, setMangaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlpha, setSelectedAlpha] = useState<string>("");

  useEffect(() => {
    fetch("/api/manga")
      .then((res) => res.json())
      .then((data) => {
        setMangaList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  const filteredManga = selectedAlpha
    ? mangaList.filter((m) =>
        m.title?.toUpperCase().startsWith(selectedAlpha)
      )
    : mangaList;

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

        {/* Alphabet Filter */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {ALPHABETS.map((alpha) => (
              <button
                key={alpha}
                className={`px-3 py-1 rounded font-semibold border ${
                  selectedAlpha === alpha
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-blue-700 hover:text-white"
                } transition`}
                onClick={() =>
                  setSelectedAlpha(selectedAlpha === alpha ? "" : alpha)
                }
              >
                {alpha}
              </button>
            ))}
            <button
              className={`px-3 py-1 rounded font-semibold border ${
                selectedAlpha === ""
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-blue-700 hover:text-white"
              } transition`}
              onClick={() => setSelectedAlpha("")}
            >
              Semua
            </button>
          </div>

          {/* List Manga */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {loading ? (
              <div className="col-span-full text-center">Loading...</div>
            ) : filteredManga.length === 0 ? (
              <div className="col-span-full text-center">
                Tidak ada manga.
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

export default DaftarManga;