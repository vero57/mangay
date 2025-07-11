# Mangay

Mangay adalah platform baca komik (manga) online dengan koleksi terlengkap dan update tercepat. Website ini dibangun menggunakan [Next.js](https://nextjs.org) dan didesain modern serta responsif dengan Tailwind CSS.

## Fitur Utama

- **Daftar Manga**: Jelajahi berbagai judul manga populer dan terbaru.
- **Filter & Pencarian**: Temukan manga berdasarkan judul, genre, atau author.
- **Jadwal Rilis**: Lihat jadwal update manga setiap hari.
- **Sistem User**: Registrasi, login, dan upload foto profil.
- **Komentar**: Berikan komentar pada manga favorit Anda.
- **Responsive Design**: Tampilan optimal di desktop maupun mobile.

## Struktur Proyek

- `src/pages/` — Halaman Next.js (homepage, daftar manga, jadwal rilis, auth, dsb)
- `src/components/` — Komponen UI seperti Navbar, Footer, dsb
- `src/app/` — Routing Next.js App Directory
- `src/pages/api/` — API endpoint (misal: users, manga)
- `public/` — Aset statis

## Instalasi & Menjalankan

1. **Clone repository ini**
2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```
3. **Konfigurasi Database**
   - Siapkan database MySQL sesuai skema pada `src/pages/mangaydb.sql`
   - Atur environment variable di `.env.local`:
     ```
     MYSQL_HOST=localhost
     MYSQL_PORT=3306
     MYSQL_USER=youruser
     MYSQL_PASSWORD=yourpassword
     MYSQL_DATABASE=mangaydb
     ```
4. **Jalankan server development**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```
5. **Akses website**
   Buka [http://localhost:3000](http://localhost:3000)

## Dokumentasi API

- **GET `/api/manga`** — List semua manga
- **POST `/api/users`** — Register user baru
- **POST `/api/users`** dengan `mode: login` — Login user
- **GET `/api/users`** — List user (admin/dev)

## Open Source

Database sudah disediakan dalam projek ini, bebas tanpa hak cipta apapun

## Lisensi

Website ini hanya untuk tujuan pembelajaran. Semua komik di website ini dari sumber lain dan hanya untuk tujuan review. Dukung pembuat aslinya dengan membeli versi resmi jika tersedia.

---


# Reminder
Under development, akan terus di update (tidak dipublish untuk publik)