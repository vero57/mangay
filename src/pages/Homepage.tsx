"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const heroSlides = [
  {
    title: "Jujutsu Kaisen",
    desc: "Chapter terbaru telah rilis! Ikuti kelanjutan pertarungan sengit antara penyihir Jujutsu melawan para kutukan.",
    image: "https://awsimages.detik.net.id/community/media/visual/2025/03/24/movie-kompilasi-jujutsu-kaisen-1742799753430.jpeg?w=1200",
    link: "#",
  },
  {
    title: "One Piece",
    desc: "Petualangan Luffy dan kru Topi Jerami berlanjut menuju pulau misterius berikutnya!",
    image: "https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABfjFlp2knrovoWG6xA8-iLLO-4bb86YMqJWGhtNWKCdwcuTkYfrLxLi-Rd83YMp4KpzpBvv3_32kFtMclVF8rKCh2v9CZ9DVLc4S.jpg?r=4d8",
    link: "#",
  },
  {
    title: "Demon Slayer",
    desc: "Pertarungan epik Tanjiro melawan iblis semakin memanas di chapter terbaru.",
    image: "https://cdn.wallpapersafari.com/9/90/0OeRJE.jpg",
    link: "#",
  },
];

const Homepage = () => {
  const [mangaList, setMangaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroIdx, setHeroIdx] = useState(0);

  const slideshowRef = useRef<HTMLDivElement>(null);
  const slideshowContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/manga")
      .then((res) => res.json())
      .then((data) => {
        setMangaList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      goNext();
    }, 4000);
    return () => clearTimeout(timer);
  }, [heroIdx]);

  const goToSlide = useCallback((index: number) => {
    setHeroIdx(index);
  }, []);

  const goPrev = useCallback(() => {
    const newIndex = (heroIdx - 1 + heroSlides.length) % heroSlides.length;
    goToSlide(newIndex);
  }, [heroIdx, goToSlide]);

  const goNext = useCallback(() => {
    const newIndex = (heroIdx + 1) % heroSlides.length;
    goToSlide(newIndex);
  }, [heroIdx, goToSlide]);

  useEffect(() => {
    if (!slideshowContainerRef.current || !slideshowRef.current) return;
    const slideWidth = slideshowContainerRef.current.offsetWidth;
    slideshowRef.current.style.transform = `translateX(${-heroIdx * slideWidth}px)`;
  }, [heroIdx]);

  return (
    <>
      <style jsx>{`
        /* Menambahkan efek transisi yang halus untuk interaksi pengguna */
        .hover-effect {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .slideshow-arrow {
          background: rgba(31, 41, 55, 0.7);
          border: none;
          color: #fff;
          font-size: 2rem;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          z-index: 20;
        }
        .slideshow-arrow:hover {
          background: rgba(59, 130, 246, 0.8);
        }
        .slideshow-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 9999px;
          background: #374151;
          margin: 0 0.25rem;
          display: inline-block;
          transition: background 0.2s;
          cursor: pointer;
        }
        .slideshow-dot.active {
          background: #3b82f6;
        }
        .slideshow-container {
          position: relative;
          overflow: hidden;
          height: 24rem; /* h-96 */
        }
        .slideshow-track {
          display: flex;
          height: 100%;
          width: 100%;
          transition: transform 0.5s ease-out;
          will-change: transform;
        }
        .slideshow-slide {
          min-width: 100%;
          height: 100%;
          position: relative;
          flex-shrink: 0;
        }
        .slide-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(to top, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0.2));
        }
      `}</style>
      <div className="bg-gray-900 text-gray-200 font-sans">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {/* HERO SECTION / SLIDESHOW */}
          <section className="mb-12">
            <div 
              ref={slideshowContainerRef}
              className="slideshow-container rounded-lg overflow-hidden relative"
            >
              <div
                ref={slideshowRef}
                className="slideshow-track"
              >
                {heroSlides.map((slide, index) => (
                  <div
                    key={index}
                    className="slideshow-slide bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${slide.image}')`,
                    }}
                  >
                    <div className="slide-content">
                      <div className="max-w-md">
                        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                          {slide.title}
                        </h1>
                        <p className="mt-2 text-gray-300 drop-shadow-md">
                          {slide.desc}
                        </p>
                        <a
                          href={slide.link}
                          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform hover:scale-105"
                        >
                          Baca Sekarang
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="slideshow-arrow absolute left-4 top-1/2 -translate-y-1/2"
                onClick={goPrev}
                aria-label="Previous"
                type="button"
              >
                &#8592;
              </button>
              <button
                className="slideshow-arrow absolute right-4 top-1/2 -translate-y-1/2"
                onClick={goNext}
                aria-label="Next"
                type="button"
              >
                &#8594;
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex">
                {heroSlides.map((_, idx) => (
                  <span
                    key={idx}
                    className={`slideshow-dot${
                      heroIdx === idx ? " active" : ""
                    }`}
                    onClick={() => goToSlide(idx)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* UPDATE TERBARU */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Update Terbaru</h2>
              <a href="#" className="text-sm text-blue-400 hover:underline">
                Lihat Semua
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {loading ? (
                <div className="col-span-full text-center">Loading...</div>
              ) : mangaList.length === 0 ? (
                <div className="col-span-full text-center">
                  Tidak ada manga.
                </div>
              ) : (
                mangaList.map((manga) => (
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
          </section>

          {/* MANGA POPULER */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Manga Populer</h2>
              <a href="#" className="text-sm text-blue-400 hover:underline">
                Lihat Semua
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {loading ? (
                <div className="col-span-full text-center">Loading...</div>
              ) : mangaList.length === 0 ? (
                <div className="col-span-full text-center">
                  Tidak ada manga.
                </div>
              ) : (
                mangaList.map((manga) => (
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
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Homepage;