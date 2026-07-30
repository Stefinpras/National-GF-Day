# National Girlfriend Day — Website

Website interaktif bertema **National Girlfriend Day (1 Agustus)**, dibangun dengan **Next.js (App Router)** + **Tailwind CSS**, dengan gaya **glassmorphism ala Apple** dan palet warna:

- `#FBEFEF` — blush (background)
- `#FFE2E2` — pink light
- `#F5CBCB` — pink mid
- `#C5B3D3` — lavender (aksen utama)

## Alur halaman

1. `/` — Landing page, animasi membuka kotak kado ("For Youu babyyyy").
2. `/bottle` — Botol ramuan yang terisi penuh saat diklik.
3. `/puzzle` — Susun hati dalam 5 detik.
4. `/calendar` — Tanggal 1 Agustus dengan lingkaran animasi + elemen dekoratif bergerak.
5. `/about` — All About You.
6. `/love-list` — 10 Things I Love About You.
7. `/moments` — Our Moment's (galeri foto, caption bisa diedit & tersimpan otomatis).
8. `/song` — A Song That Describes You (pemutar lagu, bisa play/pause & seek, otomatis lanjut ke lagu berikutnya).
9. `/letter` — Amplop terkunci kode 6 digit, isi surat bisa diedit & tersimpan otomatis.
10. `/photobooth` — Photobooth interaktif, ambil sampai 3 foto lewat kamera (atau upload sebagai cadangan) lalu otomatis disusun jadi satu strip foto yang bisa diunduh.
11. `/game` — Main SOS Yuk (tic-tac-toe lawan bot, 3 level kesulitan).

## Efek interaktif global

- **Cursor glow**: di perangkat dengan mouse, sebuah cahaya/shadow lembut mengikuti pergerakan kursor di seluruh halaman (`components/BackgroundFX.js`).
- **Love burst saat klik**: klik di area kosong (background) mana pun akan memicu ledakan kecil emoji hati/kilau di titik klik. Klik pada tombol, link, input, atau teks yang bisa diedit tidak memicu efek ini supaya tidak mengganggu interaksi normal.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Kustomisasi cepat

- **Foto asli**: ganti pemanggilan `makeSvg(...)` di `app/about/page.js`, `app/love-list/page.js`, dan `app/moments/page.js` dengan tag `<img src="/assets/nama-file.jpg" />` setelah menaruh foto di folder `public/assets/`.
- **Lagu asli**: ganti `src` di `SONGS` pada `app/song/page.js` dengan URL/berkas MP3 kamu sendiri (taruh di `public/assets/` lalu gunakan path `/assets/nama-file.mp3`).
- **Kode surat**: ubah `DEFAULT_PW` di `app/letter/page.js` (format default `DDMMYY`, saat ini `010826`).
- **Isi surat & caption foto**: sudah bisa diedit langsung di halaman (klik teksnya), otomatis tersimpan di `localStorage` browser.
- **Palet warna**: ubah nilai warna di `tailwind.config.js` (`blush`, `pink-light`, `pink-mid`, `lavender`) dan `app/globals.css`.

## Catatan

- Playlist lagu memakai berkas contoh (SoundHelix) sebagai placeholder yang bisa langsung diputar — ganti dengan lagu pilihanmu sendiri untuk hasil yang lebih personal.
- Semua state kecil (caption foto, isi surat, skor game) disimpan di `localStorage`, jadi khusus untuk device/browser yang dipakai membuka website.
- Halaman `/photobooth` butuh izin kamera dari browser (dan idealnya diakses lewat `https://` atau `localhost`, karena browser modern memblokir akses kamera di koneksi `http://` biasa). Kalau kamera ditolak/tidak tersedia, halaman otomatis menampilkan opsi upload foto sebagai cadangan.
# National-GF-Day
