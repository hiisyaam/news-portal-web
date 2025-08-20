# AI News Portal

Sebuah portal berita modern yang menampilkan berita-berita terbaru seputar Kecerdasan Buatan (AI) dari berbagai sumber terpercaya di seluruh dunia. Proyek ini dibangun menggunakan Vue 3, Vite, dan Tailwind CSS.

Proyek ini dibuat sebagai bagian dari pemenuhan persyaratan untuk proses seleksi magang di komunitas **Digital Hero**.

## Fitur Utama

-   **Agregasi Berita**: Mengambil data artikel dari 3 API berita berbeda secara bersamaan:
    -   NewsAPI.org
    -   The Guardian API
    -   NewsData.io
-   **Pencarian Real-time**: Cari artikel berdasarkan kata kunci yang relevan di judul dan deskripsi.
-   **Infinite Scroll**: Muat lebih banyak artikel dengan mudah tanpa perlu me-refresh halaman.
-   **Desain Responsif**: Tampilan yang optimal di berbagai perangkat, mulai dari desktop hingga mobile.
-   **UI Modern**: Antarmuka yang bersih dan intuitif dibangun dengan Tailwind CSS.
-   **Informasi Lengkap**: Setiap kartu berita menampilkan sumber, estimasi waktu baca, dan waktu publikasi.

## Teknologi yang Digunakan

-   **Frontend**: Vue 3 (dengan Composition API & `<script setup>`)
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **HTTP Client**: Axios
-   **Deployment**: (Anda bisa tambahkan platform deployment nanti, misal: Vercel, Netlify)

## Cara Menjalankan Proyek

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut.

### Prasyarat

Pastikan Anda sudah menginstal Node.js (versi 18 atau lebih baru) dan package manager (npm/yarn/pnpm) di mesin Anda.

### Instalasi

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/username/repository-anda.git](https://github.com/username/repository-anda.git)
    cd repository-anda
    ```

2.  **Install semua dependencies:**
    ```bash
    npm install
    ```

3.  **Konfigurasi API Key:**
    Proyek ini membutuhkan API Key dari tiga sumber berita.
    -   Buat file baru bernama `.env` di root direktori proyek.
    -   Tambahkan variabel berikut ke dalam file `.env`:

    ```env
    VITE_NEWS_API_KEY=MASUKKAN_KEY_ANDA_DARI_NEWSAPI
    VITE_GUARDIAN_API_KEY=MASUKKAN_KEY_ANDA_DARI_THE_GUARDIAN
    VITE_NEWSDATA_API_KEY=MASUKKAN_KEY_ANDA_DARI_NEWSDATA
    ```

### Menjalankan Aplikasi

-   **Development Mode:**
    Jalankan perintah berikut untuk memulai server development. Aplikasi akan berjalan di `http://localhost:3000`.
    ```bash
    npm run dev
    ```

-   **Production Build:**
    Untuk membuat versi produksi dari aplikasi, jalankan:
    ```bash
    npm run build
    ```
    Hasil build akan tersedia di dalam direktori `dist`.

## Lisensi

Proyek ini dilisensikan di bawah **MIT License**. Lihat file `LICENSE` untuk detail lebih lanjut.