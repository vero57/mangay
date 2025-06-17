"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const GENRES = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Slice of Life", "Supernatural",
  "Romance", "School Life", "Shounen", "Shoujo", "Seinen", "Josei", "Horror", "Mystery",
  "Psychological", "Sci-Fi", "Sports", "Martial Arts", "Historical", "Mecha", "Music",
  "Ecchi", "Harem", "Isekai", "Tragedy", "Yaoi", "Yuri", "Dementia", "Demons", "Military",
  "Parody", "Police", "Samurai", "Space", "Vampire", "Magic", "Game", "Kids", "Cars",
  "Thriller", "Gender Bender", "Doujinshi", "Shounen Ai", "Shoujo Ai", "Webtoon", "Manhwa", "Manhua"
];

const GenrePage = () => (
  <>
    <div className="bg-gray-900 text-gray-200 font-sans min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Daftar Genre Manga</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {GENRES.map((genre) => (
            <div
              key={genre}
              className="bg-gray-800 rounded-lg p-4 text-center font-semibold hover:bg-blue-700 hover:text-white transition cursor-pointer"
            >
              {genre}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  </>
);

export default GenrePage;
