# Portal Capaian Pembelajaran — SMP N 4 SATAP MT

Portal satu halaman untuk menampilkan dan menyalin **Capaian Pembelajaran Kurikulum Merdeka**. Teks CP tidak dibuat ulang: portal hanya menampilkan arsip resmi di [`public/cp.min.json`](public/cp.min.json).

Ditujukan untuk guru SMP N 4 SATAP MT. Saat dibuka, filter sudah di **SMP / MTs · Fase D (kelas VII–IX)**. SATAP juga bisa pindah ke SD untuk kelas I–VI.

**Pengembang:** Ahmad Fauzi, S.Pd., Gr. · Instagram [@banguzi](https://instagram.com/banguzi) · X [@banguzi](https://x.com/banguzi)

## Cara pakai

1. Pilih jenis sekolah.
2. Pilih fase. Tombol fase sudah memuat rentang kelas. Jenjang yang hanya punya satu fase terpilih sendiri.
3. Pilih mata pelajaran. Kartu CP baru muncul setelah mapel dipilih.

Selain itu:

- **Salin** pada tiap kartu, atau **Salin semua yang tampil**
- **Reset filter** kembali ke SMP · Fase D
- Cari kata (minimal 3 huruf) di dalam jenjang dan fase yang aktif
- Mode gelap dan terang
- Di ponsel, filter dilipat lewat tombol **Filter** dan tertutup sendiri setelah mapel dipilih

Setelah `cp.min.json` sekali termuat, berkas disimpan di cache peramban supaya bisa dibuka luring.

## Menjalankan

Perlu **Node.js 22** dan npm.

```bash
npm install
npm run dev
```

Buka [http://localhost:8080](http://localhost:8080).

Pemeriksaan dan build produksi:

```bash
npm run typecheck
npm run build
npm run preview
```

`npm run preview` melayani hasil build di [http://localhost:8081](http://localhost:8081). Portal tidak membutuhkan akun. Jika `DATABASE_URL` tidak ada, langkah migrasi basis data pada `npm run build` dilewati.

## Data

Arsip berisi **2.827** butir CP terverifikasi (1 September 2026), digabung dari tiga peraturan. Butir Pendidikan Agama pada Kepka 046 diganti oleh Kepka 020/2026.

| Sumber | Isi |
| --- | --- |
| Keputusan Kepala BSKAP Kemendikdasmen Nomor 046/H/KR/2025 | CP PAUD, pendidikan dasar, dan pendidikan menengah |
| Keputusan Kepala BKPDM Nomor 020 Tahun 2026 | Perubahan atas 046: CP Pendidikan Agama dan Budi Pekerti |
| Keputusan Direktur Jenderal Pendidikan Islam Nomor 9941 Tahun 2025 | CP PAI dan Bahasa Arab pada madrasah |

Jenjang di filter: PAUD, SD/MI, SMP/MTs, SMA/MA, SMK/MAK, Madrasah, Pendidikan Khusus, dan Paket A/B/C.

Setiap butir di `items` memakai kunci pendek:

| Kunci | Arti |
| --- | --- |
| `i` | identitas |
| `m` | mata pelajaran |
| `v` | varian, bila ada |
| `j` | jenis satuan pendidikan di sumber |
| `f` | fase |
| `k` | konteks atau keterangan tambahan |
| `e` | elemen |
| `x` | teks capaian, disalin apa adanya |
| `tl` | perkiraan jumlah token teks |

Filter, pencarian, dan tombol salin berjalan di peramban. Tidak ada permintaan ke layanan kecerdasan buatan.

## Tumpukan

React 19, TanStack Start, Tailwind CSS v4, dan Vite. Antarmuka bergaya desktop retro (magenta dan sian).

## Mengunggah ke GitHub

Unggah kode sumber beserta `public/cp.min.json`. Jangan unggah folder `node_modules`. Setelah repositori di-clone, jalankan `npm install` lalu `npm run dev`.
