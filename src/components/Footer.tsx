import React from "react";

const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-800 mt-12">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h4 className="text-lg font-bold text-white mb-2">
            Man<span className="text-pink-500">gay</span>
          </h4>
          <p className="text-gray-400 text-sm">
            Mangay adalah platform baca komik (manga) online dengan koleksi terlengkap dan update tercepat.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                DMCA
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                Hubungi Kami
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Disclaimer</h4>
          <p className="text-gray-400 text-sm">
            Semua komik di website ini adalah terjemahan dari sumber lain dan hanya untuk tujuan pratinjau. Mohon dukung pembuatnya dengan membeli versi resminya jika tersedia di wilayah Anda.
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        &copy; 2024 Mangay. Seluruh hak cipta dilindungi.
      </div>
    </div>
  </footer>
);

export default Footer;
