"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ManguysPage = () => {
  return (
    <div className="bg-gray-900 text-gray-200 font-sans min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center items-start px-8 md:px-16 py-10 md:py-0">
          <h1 className="text-4xl font-bold mb-4 text-blue-400">
            Apa itu <span className="text-white">Manguys?</span>
          </h1>
          <p className="mb-8 text-lg text-gray-300">
            Dengan <b>Manguys</b> kamu dapat berkontribusi untuk mengupload manga hasil translasi sendiri, kamu dapat membagikan manga yang belum ada di website ini, dan kamu juga dapat berinteraksi dengan pengguna lain melalui komentar di setiap manga yang ada. 
          </p>
          <a
            href="/auth/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow transition-transform hover:scale-105"
          >
            Join Manguys Sekarang
          </a>
        </div>
        <div className="flex-1 relative min-h-0 flex mt-10 mr-10  ">
          <img
            src="https://pict.sindonews.net/webp/480/pena/news/2023/02/09/700/1018567/9-karakter-anime-paling-sempurna-nyaris-tanpa-cela-xwg.webp"
            alt="Manguys Community"
            className="w-full h-full object-cover rounded-2xl"
            style={{ minHeight: 0, height: "100%" }}
            draggable={false}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManguysPage;
