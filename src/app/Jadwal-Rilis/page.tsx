"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const SCHEDULE = [
  {
    day: "Minggu",
    manga: {
      title: "One Piece",
      cover_url: "https://placehold.co/300x450/374151/e5e7eb?text=One+Piece",
      status: "Ongoing",
    },
  },
  {
    day: "Senin",
    manga: {
      title: "Attack on Titan",
      cover_url: "https://placehold.co/300x450/374151/e5e7eb?text=Attack+on+Titan",
      status: "Completed",
    },
  },
  {
    day: "Selasa",
    manga: {
      title: "Jujutsu Kaisen",
      cover_url: "https://placehold.co/300x450/374151/e5e7eb?text=Jujutsu+Kaisen",
      status: "Ongoing",
    },
  },
  {
    day: "Rabu",
    manga: {
      title: "Demon Slayer",
      cover_url: "https://placehold.co/300x450/374151/e5e7eb?text=Demon+Slayer",
      status: "Completed",
    },
  },
  {
    day: "Kamis",
    manga: {
      title: "My Hero Academia",
      cover_url: "https://placehold.co/300x450/374151/e5e7eb?text=My+Hero+Academia",
      status: "Ongoing",
    },
  },
  {
    day: "Jumat",
    manga: {
      title: "Black Clover",
      cover_url: "https://placehold.co/300x450/374151/e5e7eb?text=Black+Clover",
      status: "Ongoing",
    },
  },
  {
    day: "Sabtu",
    manga: {
      title: "Haikyuu!!",
      cover_url: "https://placehold.co/300x450/374151/e5e7eb?text=Haikyuu!!",
      status: "Completed",
    },
  },
];

const JadwalRilisPage = () => (
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
        <h1 className="text-3xl font-bold mb-8 text-white text-center">Jadwal Rilis Manga</h1>
        <div className="space-y-12">
          {SCHEDULE.map(({ day, manga }) => (
            <section key={day}>
              <h2 className="text-2xl font-bold text-blue-400 mb-4">{day}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <a href="#" className="group hover-effect">
                  <div className="aspect-[2/3] bg-gray-800 rounded-md overflow-hidden relative">
                    <img
                      src={manga.cover_url}
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
              </div>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  </>
);

export default JadwalRilisPage;
