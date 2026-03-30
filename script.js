/**
 * GAPURA MUDA – script.js v4.0
 * Semua tombol berfungsi penuh:
 *  ✅ Navbar: hamburger, scroll-highlight, back-to-top
 *  ✅ Hero: "Kenali Kami" scroll, "Lihat Kegiatan" scroll, counter
 *  ✅ Tentang: "Bergabung Sekarang" scroll ke kontak
 *  ✅ Anggota: filter chip, kartu → modal profil, upload foto (admin)
 *  ✅ Galeri: filter chip, hapus foto (admin), upload+simpan foto, lightbox ←→
 *  ✅ Anggaran: dropdown tahun, render tabel + chart
 *  ✅ Kontak: kirim pesan (validasi + sukses), WhatsApp, email, sosmed
 *  ✅ Footer: semua link navigasi
 *  ✅ Admin: tombol masuk/keluar, simpan foto, hapus foto
 *  ✅ Back-to-top
 *  ✅ Modal: tutup via tombol × / klik overlay / Escape
 */

/* ════════════════════════════════════════
   1. DATA DEFAULT
════════════════════════════════════════ */
const DEFAULT_ANGGOTA = [
  {
    id: 1,
    nama: "M Sulton",
    jabatan: "Ketua Umum",
    divisi: "Pengurus Inti",
    kategori: "pengurus",
    avatar: "👨‍💼",
    usia: 24,
    angkatan: 2020,
    pendidikan: "S1 Hukum, Universitas Negeri",
    minat: "Hukum & Kebijakan, Sepak Bola",
    prestasi: "Juara 1 Debat Kepemudaan Kab. 2023",
    kontak: "ahmad.fauzan@email.com",
  },
  {
    id: 2,
    nama: "Siti Rahmawati",
    jabatan: "Wakil Ketua",
    divisi: "Pengurus Inti",
    kategori: "pengurus",
    avatar: "👩‍💼",
    usia: 23,
    angkatan: 2021,
    pendidikan: "S1 Kesehatan Masyarakat",
    minat: "Kesehatan Komunitas, Literasi",
    prestasi: "Koord. Posyandu Remaja 2022–2024",
    kontak: "siti.rahmawati@email.com",
  },
  {
    id: 3,
    nama: "Budi Santoso",
    jabatan: "Sekretaris",
    divisi: "Pengurus Inti",
    kategori: "pengurus",
    avatar: "👨‍🎓",
    usia: 22,
    angkatan: 2022,
    pendidikan: "S1 Administrasi Publik",
    minat: "Manajemen Organisasi, Fotografi",
    prestasi: "Delegasi Musyawarah Nasional KT 2023",
    kontak: "budi.santoso@email.com",
  },
  {
    id: 4,
    nama: "Dewi Kusuma",
    jabatan: "Bendahara",
    divisi: "Pengurus Inti",
    kategori: "pengurus",
    avatar: "👩‍💻",
    usia: 23,
    angkatan: 2021,
    pendidikan: "S1 Akuntansi",
    minat: "Keuangan, Kerajinan Tangan",
    prestasi: "Manajer Keuangan Terbaik KT 2024",
    kontak: "dewi.kusuma@email.com",
  },
  {
    id: 5,
    nama: "Rizky Pratama",
    jabatan: "Koord. Divisi Sosial",
    divisi: "Divisi Sosial",
    kategori: "divisi",
    avatar: "🧑‍🤝‍🧑",
    usia: 21,
    angkatan: 2023,
    pendidikan: "S1 Sosiologi",
    minat: "Pengabdian Masyarakat, Teater",
    prestasi: "Penyelenggara Bakti Sosial Banjir 2023",
    kontak: "rizky.pratama@email.com",
  },
  {
    id: 6,
    nama: "Nur Aini",
    jabatan: "Koord. Divisi Budaya",
    divisi: "Divisi Budaya",
    kategori: "divisi",
    avatar: "👩‍🎨",
    usia: 22,
    angkatan: 2022,
    pendidikan: "S1 Seni Pertunjukan",
    minat: "Seni Tari, Gamelan, Batik",
    prestasi: "Juara 2 Festival Budaya Daerah 2024",
    kontak: "nur.aini@email.com",
  },
  {
    id: 7,
    nama: "Hendra Wijaya",
    jabatan: "Koord. Divisi Olahraga",
    divisi: "Divisi Olahraga",
    kategori: "divisi",
    avatar: "🏅",
    usia: 24,
    angkatan: 2020,
    pendidikan: "D3 Pendidikan Jasmani",
    minat: "Voli, Badminton, Hiking",
    prestasi: "Kapten Tim Voli Juara Kecamatan 2024",
    kontak: "hendra.wijaya@email.com",
  },
  {
    id: 8,
    nama: "Maya Sari",
    jabatan: "Koord. Divisi Pendidikan",
    divisi: "Divisi Pendidikan",
    kategori: "divisi",
    avatar: "📚",
    usia: 23,
    angkatan: 2021,
    pendidikan: "S1 Pendidikan Bahasa Indonesia",
    minat: "Mengajar, Menulis, Perpustakaan",
    prestasi: "Pembina Program Baca Desa – 200 anak",
    kontak: "maya.sari@email.com",
  },
  {
    id: 9,
    nama: "Fajar Nugroho",
    jabatan: "Anggota",
    divisi: "Divisi Olahraga",
    kategori: "anggota",
    avatar: "⚽",
    usia: 19,
    angkatan: 2024,
    pendidikan: "SMA / Sederajat",
    minat: "Sepak Bola, E-Sports",
    prestasi: "Atlet Sepak Bola Perwakilan Desa 2024",
    kontak: "fajar.nugroho@email.com",
  },
  {
    id: 10,
    nama: "Laila Fitri",
    jabatan: "Anggota",
    divisi: "Divisi Pendidikan",
    kategori: "anggota",
    avatar: "🎓",
    usia: 20,
    angkatan: 2024,
    pendidikan: "Mahasiswa Semester 3",
    minat: "Bimbingan Belajar, Desain Grafis",
    prestasi: "Relawan Mengajar TPA Desa 2023",
    kontak: "laila.fitri@email.com",
  },
  {
    id: 11,
    nama: "Agus Setiawan",
    jabatan: "Anggota",
    divisi: "Divisi Sosial",
    kategori: "anggota",
    avatar: "🤝",
    usia: 21,
    angkatan: 2023,
    pendidikan: "D3 Teknik Komputer",
    minat: "IT, Volunteering, Game Dev",
    prestasi: "Pembangun Website Desa 2024",
    kontak: "agus.setiawan@email.com",
  },
  {
    id: 12,
    nama: "Putri Lestari",
    jabatan: "Anggota",
    divisi: "Divisi Budaya",
    kategori: "anggota",
    avatar: "🎭",
    usia: 20,
    angkatan: 2024,
    pendidikan: "Mahasiswa Seni Rupa",
    minat: "Melukis, Dekorasi, Kesenian Lokal",
    prestasi: "Ilustrator Buletin Karang Taruna 2024",
    kontak: "putri.lestari@email.com",
  },
];

const DEFAULT_GALERI = [
  {
    id: "g1",
    judul: "Bakti Sosial Banjir",
    tanggal: "15 Jan 2024",
    kategori: "sosial",
    emoji: "🤝",
    imgSrc: null,
  },
  {
    id: "g2",
    judul: "Festival Seni Budaya Desa",
    tanggal: "28 Feb 2024",
    kategori: "budaya",
    emoji: "🎭",
    imgSrc: null,
  },
  {
    id: "g3",
    judul: "Turnamen Voli Antar RT",
    tanggal: "10 Mar 2024",
    kategori: "olahraga",
    emoji: "🏐",
    imgSrc: null,
  },
  {
    id: "g4",
    judul: "Pelatihan Kewirausahaan",
    tanggal: "22 Mar 2024",
    kategori: "pendidikan",
    emoji: "💡",
    imgSrc: null,
  },
  {
    id: "g5",
    judul: "Penghijauan & Bersih Desa",
    tanggal: "05 Apr 2024",
    kategori: "sosial",
    emoji: "🌿",
    imgSrc: null,
  },
  {
    id: "g6",
    judul: "Pentas Seni 17 Agustus",
    tanggal: "17 Agt 2024",
    kategori: "budaya",
    emoji: "🎪",
    imgSrc: null,
  },
  {
    id: "g7",
    judul: "Lomba Futsal Pemuda",
    tanggal: "08 Sep 2024",
    kategori: "olahraga",
    emoji: "⚽",
    imgSrc: null,
  },
  {
    id: "g8",
    judul: "Bimbingan Belajar Gratis",
    tanggal: "20 Sep 2024",
    kategori: "pendidikan",
    emoji: "📚",
    imgSrc: null,
  },
  {
    id: "g9",
    judul: "Sunatan Massal",
    tanggal: "10 Okt 2024",
    kategori: "sosial",
    emoji: "🏥",
    imgSrc: null,
  },
  {
    id: "g10",
    judul: "Pameran Kerajinan Lokal",
    tanggal: "30 Okt 2024",
    kategori: "budaya",
    emoji: "🎨",
    imgSrc: null,
  },
  {
    id: "g11",
    judul: "Jalan Sehat Sumpah Pemuda",
    tanggal: "28 Okt 2024",
    kategori: "olahraga",
    emoji: "🏃",
    imgSrc: null,
  },
  {
    id: "g12",
    judul: "Workshop Digital Marketing",
    tanggal: "15 Nov 2024",
    kategori: "pendidikan",
    emoji: "💻",
    imgSrc: null,
  },
];

const DEFAULT_ANGGARAN = {
  2023: [
    {
      id: "a1",
      tanggal: "02 Jan 2023",
      keterangan: "Iuran Anggota Januari",
      kategori: "Iuran",
      tipe: "pemasukan",
      jumlah: 940000,
    },
    {
      id: "a2",
      tanggal: "10 Jan 2023",
      keterangan: "Dana Sosial Banjir",
      kategori: "Sosial",
      tipe: "pengeluaran",
      jumlah: 2500000,
    },
    {
      id: "a3",
      tanggal: "15 Jan 2023",
      keterangan: "Bantuan Desa – Prog. Pemuda",
      kategori: "Dana Desa",
      tipe: "pemasukan",
      jumlah: 5000000,
    },
    {
      id: "a4",
      tanggal: "20 Feb 2023",
      keterangan: "Peralatan Kegiatan Olahraga",
      kategori: "Olahraga",
      tipe: "pengeluaran",
      jumlah: 1800000,
    },
    {
      id: "a5",
      tanggal: "28 Feb 2023",
      keterangan: "Iuran Anggota Feb & Mar",
      kategori: "Iuran",
      tipe: "pemasukan",
      jumlah: 1880000,
    },
    {
      id: "a6",
      tanggal: "10 Mar 2023",
      keterangan: "Konsumsi Turnamen Voli",
      kategori: "Olahraga",
      tipe: "pengeluaran",
      jumlah: 750000,
    },
    {
      id: "a7",
      tanggal: "25 Mar 2023",
      keterangan: "Sponsorship Lokal Turnamen",
      kategori: "Sponsor",
      tipe: "pemasukan",
      jumlah: 2000000,
    },
    {
      id: "a8",
      tanggal: "05 Apr 2023",
      keterangan: "Bibit Tanaman Penghijauan",
      kategori: "Lingkungan",
      tipe: "pengeluaran",
      jumlah: 600000,
    },
    {
      id: "a9",
      tanggal: "01 Mei 2024",
      keterangan: "Iuran Anggota April–Mei",
      kategori: "Iuran",
      tipe: "pemasukan",
      jumlah: 1880000,
    },
    {
      id: "a10",
      tanggal: "17 Agt 2024",
      keterangan: "Dekorasi & Perlengkapan 17-an",
      kategori: "Budaya",
      tipe: "pengeluaran",
      jumlah: 3200000,
    },
    {
      id: "a11",
      tanggal: "01 Sep 2024",
      keterangan: "Donasi Warga & Kas Masuk",
      kategori: "Donasi",
      tipe: "pemasukan",
      jumlah: 1500000,
    },
    {
      id: "a12",
      tanggal: "10 Okt 2024",
      keterangan: "Logistik Sunatan Massal",
      kategori: "Sosial",
      tipe: "pengeluaran",
      jumlah: 4500000,
    },
    {
      id: "a13",
      tanggal: "15 Okt 2024",
      keterangan: "Bantuan Desa – Semester 2",
      kategori: "Dana Desa",
      tipe: "pemasukan",
      jumlah: 5000000,
    },
    {
      id: "a14",
      tanggal: "28 Okt 2024",
      keterangan: "Konsumsi Jalan Sehat",
      kategori: "Olahraga",
      tipe: "pengeluaran",
      jumlah: 1200000,
    },
    {
      id: "a15",
      tanggal: "15 Nov 2024",
      keterangan: "Sewa Tempat Workshop",
      kategori: "Pendidikan",
      tipe: "pengeluaran",
      jumlah: 800000,
    },
    {
      id: "a16",
      tanggal: "30 Nov 2024",
      keterangan: "Iuran Anggota Okt–Nov",
      kategori: "Iuran",
      tipe: "pemasukan",
      jumlah: 1880000,
    },
    {
      id: "a17",
      tanggal: "31 Des 2024",
      keterangan: "Iuran Anggota Desember",
      kategori: "Iuran",
      tipe: "pemasukan",
      jumlah: 940000,
    },
  ],
  2026: [
    {
      id: "b1",
      tanggal: "05 Jan 2023",
      keterangan: "Iuran Anggota Januari 2023",
      kategori: "Iuran",
      tipe: "pemasukan",
      jumlah: 840000,
    },
    {
      id: "b2",
      tanggal: "20 Jan 2023",
      keterangan: "Kegiatan Baksos Awal Tahun",
      kategori: "Sosial",
      tipe: "pengeluaran",
      jumlah: 1800000,
    },
    {
      id: "b3",
      tanggal: "01 Mar 2023",
      keterangan: "Bantuan Desa Semester 1",
      kategori: "Dana Desa",
      tipe: "pemasukan",
      jumlah: 4500000,
    },
    {
      id: "b4",
      tanggal: "17 Agt 2023",
      keterangan: "Festival Kemerdekaan 2023",
      kategori: "Budaya",
      tipe: "pengeluaran",
      jumlah: 2800000,
    },
    {
      id: "b5",
      tanggal: "01 Sep 2023",
      keterangan: "Bantuan Desa Semester 2",
      kategori: "Dana Desa",
      tipe: "pemasukan",
      jumlah: 4500000,
    },
    {
      id: "b6",
      tanggal: "15 Okt 2023",
      keterangan: "Peralatan Olahraga Baru",
      kategori: "Olahraga",
      tipe: "pengeluaran",
      jumlah: 2200000,
    },
    {
      id: "b7",
      tanggal: "01 Nov 2023",
      keterangan: "Iuran Akumulasi Okt–Des",
      kategori: "Iuran",
      tipe: "pemasukan",
      jumlah: 2520000,
    },
    {
      id: "b8",
      tanggal: "20 Nov 2023",
      keterangan: "Operasional Sekretariat",
      kategori: "Operasional",
      tipe: "pengeluaran",
      jumlah: 600000,
    },
  ],
};

const CHART_COLORS = [
  "#1a6b3a",
  "#f5a623",
  "#2563eb",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
  "#16a34a",
  "#ea580c",
];
const ADMIN_PASS = "admin123";
const LS_ANGGOTA = "gm_anggota";
const LS_GALERI = "gm_galeri_items";
const LS_ANGGARAN = "gm_anggaran";
const LS_PHOTOS = "gm_member_photos";
const MAX_MB = 5;

/* ════════════════════════════════════════
   2. STATE
════════════════════════════════════════ */
let anggotaData = [];
let galeriData = [];
let anggaranData = {};
let memberPhotos = {};
let isAdmin = false;
let memberFilter = "all";
let galeriFilter = "all";
let lbList = [];
let lbIdx = 0;
let uploadTarget = null;
let pendingPhoto = null;
let pendingGalFiles = [];

/* ════════════════════════════════════════
   3. ENTRY POINT
════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  initNavbar();
  initHeroCounter();
  initReveal();
  initAdminMode();
  initMemberSection();
  initGaleriSection();
  initAnggaranSection();
  initKontakForm();
  initBackTop();
  initGlobalKeyboard();
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* ════════════════════════════════════════
   4. STORAGE
════════════════════════════════════════ */
function loadData() {
  anggotaData = lsGet(LS_ANGGOTA, DEFAULT_ANGGOTA);
  galeriData = lsGet(LS_GALERI, DEFAULT_GALERI);
  anggaranData = lsGet(LS_ANGGARAN, DEFAULT_ANGGARAN);
  memberPhotos = lsGet(LS_PHOTOS, {});
}
function lsGet(key, def) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : def;
  } catch {
    return def;
  }
}
function lsSave(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    showToast("Penyimpanan penuh. Foto mungkin tidak tersimpan.", "warn");
  }
}

/* ════════════════════════════════════════
   5. NAVBAR
════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const ham = document.getElementById("hamburger");
  const drawer = document.getElementById("nav-drawer");
  const overlay = document.getElementById("nav-overlay");
  const backTop = document.getElementById("back-top");

  /* --- Sticky navbar + highlight nav link aktif --- */
  const onScroll = () => {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle("stuck", scrolled);
    backTop.hidden = window.scrollY < 400;
    highlightNav();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // jalankan sekali saat load

  /* --- Hamburger: buka/tutup drawer --- */
  ham.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("open");
    ham.setAttribute("aria-expanded", String(isOpen));
    drawer.setAttribute("aria-hidden", String(!isOpen));
    overlay.classList.toggle("show", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  /* --- Overlay: tutup drawer saat klik di luar --- */
  overlay.addEventListener("click", closeDrawer);

  /* --- Link di dalam drawer: tutup setelah klik --- */
  drawer.querySelectorAll(".drawer-link").forEach((link) => {
    link.addEventListener("click", () => {
      closeDrawer();
      // Smooth scroll untuk anchor link
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.getElementById(href.slice(1));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* --- Back to top --- */
  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function closeDrawer() {
    drawer.classList.remove("open");
    ham.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  function highlightNav() {
    const sections = ["tentang", "anggota", "galeri", "anggaran", "kontak"];
    let current = "";
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    document
      .querySelectorAll(".nav-link, .drawer-link:not(.drawer-admin)")
      .forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === "#" + current);
      });
  }
}

/* ════════════════════════════════════════
   6. HERO COUNTER ANIMASI
════════════════════════════════════════ */
function initHeroCounter() {
  const counters = document.querySelectorAll(".count[data-to]");
  let ran = false;

  const run = () => {
    if (ran) return;
    ran = true;
    counters.forEach((el) => {
      const target = +el.dataset.to;
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur;
        if (cur >= target) clearInterval(t);
      }, 25);
    });
  };

  const obs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) run();
    },
    { threshold: 0.2 }
  );

  const hero = document.querySelector(".hero");
  if (hero) obs.observe(hero);
}

/* ════════════════════════════════════════
   7. REVEAL ON SCROLL
════════════════════════════════════════ */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("on"), i * 80);
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
  );
  els.forEach((el) => obs.observe(el));
}

/* ════════════════════════════════════════
   8. ADMIN MODE
════════════════════════════════════════ */
function initAdminMode() {
  const adminBar = document.getElementById("admin-bar");
  const loginModal = document.getElementById("admin-login-overlay");
  const loginClose = document.getElementById("admin-login-close");
  const loginBtn = document.getElementById("admin-login-btn");
  const passInput = document.getElementById("admin-pass");
  const passErr = document.getElementById("admin-pass-err");
  const logoutBtn = document.getElementById("admin-logout");

  /* Tidak ada tombol toggle di navbar lagi — masuk via admin.html
     Tapi jika user ketik URL #admin-login di URL bar, tetap buka */
  if (window.location.hash === "#admin-login") openAdminLogin();

  function openAdminLogin() {
    loginModal.hidden = false;
    document.body.style.overflow = "hidden";
    passInput.value = "";
    passErr.textContent = "";
    setTimeout(() => passInput.focus(), 100);
  }
  function closeAdminLogin() {
    loginModal.hidden = true;
    document.body.style.overflow = "";
  }

  loginClose.addEventListener("click", closeAdminLogin);
  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) closeAdminLogin();
  });

  const tryLogin = () => {
    passErr.textContent = "";
    if (passInput.value === ADMIN_PASS) {
      closeAdminLogin();
      activateAdmin();
    } else {
      passErr.textContent = "Kata sandi salah. Coba lagi.";
      passInput.select();
    }
  };
  loginBtn.addEventListener("click", tryLogin);
  passInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryLogin();
  });

  logoutBtn.addEventListener("click", () => {
    isAdmin = false;
    adminBar.hidden = true;
    document.getElementById("admin-galeri-panel").hidden = true;
    renderMembers(memberFilter);
    renderGaleri(galeriFilter);
    showToast("Anda telah keluar dari mode admin.", "info");
  });
}

function activateAdmin() {
  isAdmin = true;
  document.getElementById("admin-bar").hidden = false;
  document.getElementById("admin-galeri-panel").hidden = false;
  renderMembers(memberFilter);
  renderGaleri(galeriFilter);
  renderGaleriAdminThumbs();
  updateGalCount();
  showToast("Mode Admin aktif. Selamat datang! 🛡️", "success");
}

/* ════════════════════════════════════════
   9. SECTION ANGGOTA
════════════════════════════════════════ */
function initMemberSection() {
  /* Filter chip */
  document.querySelectorAll(".chip[data-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip[data-filter]").forEach((c) => {
        c.classList.remove("active");
        c.setAttribute("aria-selected", "false");
      });
      chip.classList.add("active");
      chip.setAttribute("aria-selected", "true");
      renderMembers(chip.dataset.filter);
    });
  });

  /* Modal profil anggota */
  const modal = document.getElementById("member-modal");
  const closeBtn = document.getElementById("mm-close");
  closeBtn.addEventListener("click", () => closeModal(modal));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });

  /* Modal upload foto */
  initUploadModal();

  renderMembers("all");
}

function renderMembers(filter) {
  memberFilter = filter;
  const grid = document.getElementById("member-grid");
  const list =
    filter === "all"
      ? anggotaData
      : anggotaData.filter((a) => a.kategori === filter);

  if (list.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:3rem 1rem">
      Tidak ada anggota dalam kategori ini.</p>`;
    return;
  }

  grid.innerHTML = list
    .map((a, i) => {
      const photo = memberPhotos[a.id];
      const photoEl = photo
        ? `<img src="${photo}" alt="Foto ${a.nama}" loading="lazy" />`
        : `<span aria-hidden="true">${a.avatar}</span>`;

      const badgePengurus =
        a.kategori === "pengurus"
          ? `<span class="mc-badge-pengurus">Pengurus</span>`
          : "";

      const uploadBtn = isAdmin
        ? `<button class="mc-upload-btn" data-uid="${a.id}"
           aria-label="Ganti foto ${a.nama}" title="Ganti Foto">
           <i class="ri-camera-line" aria-hidden="true"></i> Foto
         </button>`
        : "";

      return `
      <article class="member-card" role="listitem" tabindex="0"
               data-mid="${a.id}" style="animation-delay:${i * 55}ms"
               aria-label="Profil ${a.nama}">
        <div class="mc-photo">
          ${photoEl}
          ${badgePengurus}
          ${uploadBtn}
        </div>
        <div class="mc-body">
          <div class="mc-name">${a.nama}</div>
          <div class="mc-role">${a.jabatan}</div>
          <span class="mc-div">${a.divisi}</span>
        </div>
      </article>`;
    })
    .join("");

  /* Kartu → buka modal profil */
  grid.querySelectorAll(".member-card").forEach((card) => {
    const openProfile = (e) => {
      if (e.target.closest(".mc-upload-btn")) return;
      const a = anggotaData.find((x) => x.id === +card.dataset.mid);
      if (a) showMemberModal(a);
    };
    card.addEventListener("click", openProfile);
    card.addEventListener("keydown", (e) => {
      if (
        (e.key === "Enter" || e.key === " ") &&
        !e.target.closest(".mc-upload-btn")
      ) {
        e.preventDefault();
        openProfile(e);
      }
    });
  });

  /* Tombol upload foto (admin) */
  grid.querySelectorAll(".mc-upload-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openUploadModal(+btn.dataset.uid);
    });
  });

  /* Chip filter aktif */
  document.querySelectorAll(".chip[data-filter]").forEach((c) => {
    c.classList.toggle("active", c.dataset.filter === filter);
    c.setAttribute(
      "aria-selected",
      c.dataset.filter === filter ? "true" : "false"
    );
  });
}

/* Modal profil anggota */
function showMemberModal(a) {
  const photo = memberPhotos[a.id];
  const avatarEl = photo
    ? `<div class="mm-avatar"><img src="${photo}" alt="${a.nama}" /></div>`
    : `<div class="mm-avatar" aria-hidden="true" style="font-size:3rem">${a.avatar}</div>`;

  document.getElementById("mm-content").innerHTML = `
    ${avatarEl}
    <h3 class="mm-name" id="mm-name">${a.nama}</h3>
    <div class="mm-role">${a.jabatan} · ${a.divisi}</div>
    <div class="mm-rows">
      <div class="mm-row">
        <i class="ri-user-line" aria-hidden="true"></i>
        <div><b>Usia &amp; Angkatan</b><span>${a.usia} tahun · Bergabung ${a.angkatan}</span></div>
      </div>
      <div class="mm-row">
        <i class="ri-graduation-cap-line" aria-hidden="true"></i>
        <div><b>Pendidikan</b><span>${a.pendidikan}</span></div>
      </div>
      <div class="mm-row">
        <i class="ri-heart-line" aria-hidden="true"></i>
        <div><b>Minat &amp; Bakat</b><span>${a.minat}</span></div>
      </div>
      <div class="mm-row">
        <i class="ri-award-line" aria-hidden="true"></i>
        <div><b>Prestasi</b><span>${a.prestasi}</span></div>
      </div>
      <div class="mm-row">
        <i class="ri-mail-line" aria-hidden="true"></i>
        <div><b>Email</b>
          <a href="mailto:${a.kontak}" style="color:var(--green)">${a.kontak}</a>
        </div>
      </div>
    </div>`;

  openModal(document.getElementById("member-modal"));
  document.getElementById("mm-close").focus();
}

/* ════════════════════════════════════════
   10. UPLOAD FOTO ANGGOTA (admin)
════════════════════════════════════════ */
function initUploadModal() {
  const modal = document.getElementById("upload-modal");
  const closeBtn = document.getElementById("um-close");
  const dz = document.getElementById("um-dropzone");
  const fi = document.getElementById("um-file");
  const saveBtn = document.getElementById("um-save");
  const rmBtn = document.getElementById("um-remove");

  /* Tutup modal */
  closeBtn.addEventListener("click", () => {
    closeModal(modal);
    uploadTarget = null;
    pendingPhoto = null;
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
      uploadTarget = null;
      pendingPhoto = null;
    }
  });

  /* Dropzone klik → buka file picker */
  dz.addEventListener("click", () => fi.click());
  dz.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fi.click();
    }
  });

  /* Drag & drop */
  dz.addEventListener("dragover", (e) => {
    e.preventDefault();
    dz.classList.add("drag-over");
  });
  dz.addEventListener("dragleave", () => dz.classList.remove("drag-over"));
  dz.addEventListener("drop", (e) => {
    e.preventDefault();
    dz.classList.remove("drag-over");
    if (e.dataTransfer.files[0]) readMemberFile(e.dataTransfer.files[0]);
  });

  /* File dipilih */
  fi.addEventListener("change", () => {
    if (fi.files[0]) readMemberFile(fi.files[0]);
    fi.value = ""; // reset agar bisa pilih file yang sama lagi
  });

  /* Simpan foto */
  saveBtn.addEventListener("click", () => {
    if (!pendingPhoto || !uploadTarget) return;
    memberPhotos[uploadTarget] = pendingPhoto;
    lsSave(LS_PHOTOS, memberPhotos);
    closeModal(modal);
    uploadTarget = null;
    pendingPhoto = null;
    renderMembers(memberFilter);
    showToast("Foto profil berhasil disimpan! ✅", "success");
  });

  /* Hapus foto */
  rmBtn.addEventListener("click", () => {
    if (!uploadTarget) return;
    delete memberPhotos[uploadTarget];
    lsSave(LS_PHOTOS, memberPhotos);
    closeModal(modal);
    uploadTarget = null;
    pendingPhoto = null;
    renderMembers(memberFilter);
    showToast("Foto profil dihapus.", "info");
  });
}

function openUploadModal(memberId) {
  const a = anggotaData.find((x) => x.id === memberId);
  if (!a) return;

  uploadTarget = memberId;
  pendingPhoto = null;

  /* Set info anggota */
  const photo = memberPhotos[memberId];
  const avatarEl = document.getElementById("um-avatar");
  avatarEl.innerHTML = photo
    ? `<img src="${photo}" alt="${a.nama}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
    : `<span style="font-size:1.8rem">${a.avatar}</span>`;
  document.getElementById("um-name").textContent = a.nama;
  document.getElementById("um-role").textContent = a.jabatan;

  /* Reset dropzone */
  const dz = document.getElementById("um-dropzone");
  const hint = document.getElementById("um-hint");
  const oldPreview = dz.querySelector(".dropzone-preview");
  if (oldPreview) oldPreview.remove();
  hint.style.display = "";

  document.getElementById("um-save").disabled = true;
  document.getElementById("um-remove").hidden = !photo;

  openModal(document.getElementById("upload-modal"));
}

function readMemberFile(file) {
  if (!file.type.startsWith("image/")) {
    showToast("File harus berupa gambar (PNG/JPG/WEBP).", "warn");
    return;
  }
  if (file.size > MAX_MB * 1024 * 1024) {
    showToast(`Ukuran maksimal ${MAX_MB} MB.`, "warn");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    pendingPhoto = e.target.result;
    const dz = document.getElementById("um-dropzone");
    const hint = document.getElementById("um-hint");
    hint.style.display = "none";
    const old = dz.querySelector(".dropzone-preview");
    if (old) old.remove();
    const img = document.createElement("img");
    img.src = pendingPhoto;
    img.className = "dropzone-preview";
    img.alt = "Preview foto";
    dz.appendChild(img);
    document.getElementById("um-save").disabled = false;
    /* Update avatar di header modal */
    const av = document.getElementById("um-avatar");
    av.innerHTML = `<img src="${pendingPhoto}" alt="preview" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
  };
  reader.readAsDataURL(file);
}

/* ════════════════════════════════════════
   11. GALERI
════════════════════════════════════════ */
function initGaleriSection() {
  /* Filter chip galeri */
  document.querySelectorAll(".chip[data-gfilter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip[data-gfilter]").forEach((c) => {
        c.classList.remove("active");
        c.setAttribute("aria-selected", "false");
      });
      chip.classList.add("active");
      chip.setAttribute("aria-selected", "true");
      galeriFilter = chip.dataset.gfilter;
      renderGaleri(galeriFilter);
    });
  });

  /* Lightbox */
  initLightbox();

  /* Admin: upload galeri */
  initGaleriUpload();

  renderGaleri("all");
}

function renderGaleri(filter) {
  galeriFilter = filter;
  const grid = document.getElementById("galeri-grid");
  const list =
    filter === "all"
      ? galeriData
      : galeriData.filter((g) => g.kategori === filter);

  if (list.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:3rem 1rem">
      Belum ada foto dalam kategori ini.</p>`;
    return;
  }

  grid.innerHTML = list
    .map((g, i) => {
      const visual = g.imgSrc
        ? `<img src="${g.imgSrc}" alt="${g.judul}" loading="lazy" />`
        : `<span aria-hidden="true">${g.emoji}</span>`;

      const delBtn = isAdmin
        ? `<button class="gal-del" data-gid="${g.id}"
           aria-label="Hapus foto ${g.judul}" title="Hapus">
           <i class="ri-delete-bin-line" aria-hidden="true"></i>
         </button>`
        : "";

      return `
      <div class="gal-item" role="listitem" tabindex="0"
           data-gid="${g.id}" style="animation-delay:${i * 45}ms"
           aria-label="${g.judul}, ${g.tanggal}">
        ${delBtn}
        <div class="gal-visual">${visual}</div>
        <div class="gal-info" aria-hidden="true">
          <span class="gal-cat">${cap(g.kategori)}</span>
          <div class="gal-title">${g.judul}</div>
          <div class="gal-date">${g.tanggal}</div>
        </div>
      </div>`;
    })
    .join("");

  /* Buka lightbox */
  grid.querySelectorAll(".gal-item").forEach((item) => {
    const openLB = (e) => {
      if (e.target.closest(".gal-del")) return;
      lbList = list;
      lbIdx = list.findIndex((g) => g.id === item.dataset.gid);
      if (lbIdx < 0) lbIdx = 0;
      openLightbox();
    };
    item.addEventListener("click", openLB);
    item.addEventListener("keydown", (e) => {
      if (
        (e.key === "Enter" || e.key === " ") &&
        !e.target.closest(".gal-del")
      ) {
        e.preventDefault();
        openLB(e);
      }
    });
  });

  /* Hapus foto galeri (admin) */
  grid.querySelectorAll(".gal-del").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const judul =
        galeriData.find((g) => g.id === btn.dataset.gid)?.judul || "foto ini";
      if (!confirm(`Hapus "${judul}" dari galeri?`)) return;
      galeriData = galeriData.filter((g) => g.id !== btn.dataset.gid);
      lsSave(LS_GALERI, galeriData);
      renderGaleri(galeriFilter);
      renderGaleriAdminThumbs();
      updateGalCount();
      showToast("Foto dihapus dari galeri.", "info");
    });
  });

  /* Chip filter sinkron */
  document.querySelectorAll(".chip[data-gfilter]").forEach((c) => {
    c.classList.toggle("active", c.dataset.gfilter === filter);
    c.setAttribute(
      "aria-selected",
      c.dataset.gfilter === filter ? "true" : "false"
    );
  });
}

/* ── Admin: upload foto galeri ── */
function initGaleriUpload() {
  const dz = document.getElementById("gal-dropzone");
  const fi = document.getElementById("gal-file");
  const saveBtn = document.getElementById("gal-save");
  const previews = document.getElementById("gal-previews");
  const hint = document.getElementById("gal-hint");
  if (!dz) return;

  /* Dropzone */
  dz.addEventListener("click", () => fi.click());
  dz.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fi.click();
    }
  });
  dz.addEventListener("dragover", (e) => {
    e.preventDefault();
    dz.classList.add("drag-over");
  });
  dz.addEventListener("dragleave", () => dz.classList.remove("drag-over"));
  dz.addEventListener("drop", (e) => {
    e.preventDefault();
    dz.classList.remove("drag-over");
    readGalFiles([...e.dataTransfer.files]);
  });
  fi.addEventListener("change", () => {
    if (fi.files.length) readGalFiles([...fi.files]);
    fi.value = "";
  });

  /* Simpan ke galeri */
  saveBtn.addEventListener("click", () => {
    if (!pendingGalFiles.length) {
      showToast("Pilih foto terlebih dahulu.", "warn");
      return;
    }

    const judul =
      document.getElementById("gal-judul").value.trim() || "Kegiatan";
    const tglVal = document.getElementById("gal-tanggal").value;
    const kat = document.getElementById("gal-kat").value;
    const tglLabel = tglVal
      ? formatDateID(tglVal)
      : new Date().toLocaleDateString("id-ID");
    const count = pendingGalFiles.length;

    pendingGalFiles.forEach((pf, i) => {
      galeriData.unshift({
        id: "u_" + Date.now() + "_" + i,
        judul: count > 1 ? `${judul} (${i + 1})` : judul,
        tanggal: tglLabel,
        kategori: kat,
        emoji: "🖼️",
        imgSrc: pf.dataURL,
      });
    });

    lsSave(LS_GALERI, galeriData);
    renderGaleri(galeriFilter);
    renderGaleriAdminThumbs();
    updateGalCount();

    /* Reset form */
    pendingGalFiles = [];
    previews.innerHTML = "";
    hint.style.display = "";
    document.getElementById("gal-judul").value = "";
    document.getElementById("gal-tanggal").value = "";
    saveBtn.disabled = true;

    showToast(`${count} foto berhasil ditambahkan ke galeri 📸`, "success");
  });
}

function readGalFiles(files) {
  const valid = files.filter(
    (f) => f.type.startsWith("image/") && f.size <= MAX_MB * 1024 * 1024
  );
  const invalid = files.length - valid.length;
  if (invalid > 0)
    showToast(`${invalid} file dilewati (bukan gambar atau > 5 MB).`, "warn");
  if (!valid.length) return;

  const hint = document.getElementById("gal-hint");
  const previews = document.getElementById("gal-previews");
  const saveBtn = document.getElementById("gal-save");
  hint.style.display = "none";
  pendingGalFiles = [];

  valid.forEach((f) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      pendingGalFiles.push({ dataURL: e.target.result });
      const img = document.createElement("img");
      img.src = e.target.result;
      img.className = "dz-thumb";
      img.alt = f.name;
      previews.appendChild(img);
      saveBtn.disabled = false;
    };
    reader.readAsDataURL(f);
  });
}

function renderGaleriAdminThumbs() {
  const thumbGrid = document.getElementById("gal-thumbs");
  if (!thumbGrid) return;
  thumbGrid.innerHTML = galeriData
    .map(
      (g) => `
    <div class="thumb-item">
      ${
        g.imgSrc
          ? `<img src="${g.imgSrc}" alt="${g.judul}" style="width:100%;height:100%;object-fit:cover">`
          : `<span style="font-size:2rem">${g.emoji}</span>`
      }
      <button class="thumb-del" data-gid="${g.id}" aria-label="Hapus ${
        g.judul
      }">
        <i class="ri-close-line" aria-hidden="true"></i>
      </button>
      <div class="thumb-label">${g.judul}</div>
    </div>`
    )
    .join("");

  thumbGrid.querySelectorAll(".thumb-del").forEach((btn) => {
    btn.addEventListener("click", () => {
      galeriData = galeriData.filter((g) => g.id !== btn.dataset.gid);
      lsSave(LS_GALERI, galeriData);
      renderGaleri(galeriFilter);
      renderGaleriAdminThumbs();
      updateGalCount();
    });
  });
}

function updateGalCount() {
  const el = document.getElementById("gal-count");
  if (el) el.textContent = galeriData.length;
}

/* ── Lightbox ── */
function initLightbox() {
  const lb = document.getElementById("lightbox");
  const content = document.getElementById("lb-content");
  const caption = document.getElementById("lb-caption");
  const closeBtn = document.getElementById("lb-close");
  const prevBtn = document.getElementById("lb-prev");
  const nextBtn = document.getElementById("lb-next");

  closeBtn.addEventListener("click", () => closeLightbox());
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });

  prevBtn.addEventListener("click", () => {
    lbIdx = (lbIdx - 1 + lbList.length) % lbList.length;
    showFrame();
  });
  nextBtn.addEventListener("click", () => {
    lbIdx = (lbIdx + 1) % lbList.length;
    showFrame();
  });

  function showFrame() {
    const g = lbList[lbIdx];
    if (!g) return;
    content.innerHTML = g.imgSrc
      ? `<img src="${g.imgSrc}" alt="${g.judul}" />`
      : `<span aria-hidden="true" style="font-size:6rem;filter:drop-shadow(0 8px 24px rgba(0,0,0,.3))">${g.emoji}</span>`;
    caption.textContent = `${g.judul} — ${g.tanggal}`;
  }

  // Expose showFrame untuk dipanggil dari renderGaleri
  window._lbShowFrame = showFrame;
}

function openLightbox() {
  const lb = document.getElementById("lightbox");
  window._lbShowFrame?.();
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("lb-close").focus();
}

function closeLightbox() {
  document.getElementById("lightbox").hidden = true;
  document.body.style.overflow = "";
}

/* ════════════════════════════════════════
   12. ANGGARAN
════════════════════════════════════════ */
function initAnggaranSection() {
  const sel = document.getElementById("periode-select");
  if (!sel) return;
  sel.addEventListener("change", () => renderAnggaran(sel.value));
  renderAnggaran(sel.value);
}

function renderAnggaran(tahun) {
  const data = anggaranData[tahun] || [];
  document.getElementById("periode-label").textContent = `· ${tahun}`;

  /* Hitung totals */
  let inc = 0,
    exp = 0;
  data.forEach((d) => {
    if (d.tipe === "pemasukan") inc += d.jumlah;
    else exp += d.jumlah;
  });

  animateAmount(document.getElementById("total-income"), inc);
  animateAmount(document.getElementById("total-expense"), exp);
  animateAmount(document.getElementById("total-balance"), inc - exp);

  /* Tabel */
  const tbody = document.getElementById("trx-tbody");
  tbody.innerHTML =
    data
      .map(
        (d) => `
    <tr>
      <td>${d.tanggal}</td>
      <td>${d.keterangan}</td>
      <td class="hide-mobile"><span class="kat-tag">${d.kategori}</span></td>
      <td>
        <span class="trx-badge ${d.tipe === "pemasukan" ? "masuk" : "keluar"}">
          ${d.tipe === "pemasukan" ? "↓ Masuk" : "↑ Keluar"}
        </span>
      </td>
      <td class="tr" style="font-weight:700;color:var(--${
        d.tipe === "pemasukan" ? "income" : "expense"
      })">
        ${d.tipe === "pemasukan" ? "+" : "−"}${fmtRp(d.jumlah)}
      </td>
    </tr>`
      )
      .join("") ||
    `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:2rem">
      Tidak ada transaksi untuk periode ini.</td></tr>`;

  /* Chart */
  drawDonutChart(data);
}

function animateAmount(el, target) {
  if (!el) return;
  let cur = 0;
  const step = Math.max(1, Math.ceil(target / 80));
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = fmtRp(cur);
    if (cur >= target) clearInterval(t);
  }, 16);
}

function drawDonutChart(data) {
  const canvas = document.getElementById("budget-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width,
    H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  /* Kumpulkan pengeluaran per kategori */
  const cats = {};
  data
    .filter((d) => d.tipe === "pengeluaran")
    .forEach((d) => {
      cats[d.kategori] = (cats[d.kategori] || 0) + d.jumlah;
    });

  const entries = Object.entries(cats).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((s, [, v]) => s + v, 0);

  if (!total) {
    ctx.fillStyle = "#e5e7eb";
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, W / 2 - 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, (W / 2 - 16) * 0.54, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#6b7280";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "12px 'DM Sans',sans-serif";
    ctx.fillText("Belum ada", W / 2, H / 2 - 8);
    ctx.fillText("pengeluaran", W / 2, H / 2 + 8);
    document.getElementById("budget-legend").innerHTML = "";
    return;
  }

  const cx = W / 2,
    cy = H / 2,
    r = W / 2 - 16,
    ri = r * 0.54;
  let startAngle = -Math.PI / 2;

  entries.forEach(([, val], i) => {
    const slice = (val / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, startAngle + slice);
    ctx.closePath();
    ctx.fillStyle = CHART_COLORS[i % CHART_COLORS.length];
    ctx.fill();
    startAngle += slice;
  });

  /* Lubang donat */
  ctx.beginPath();
  ctx.arc(cx, cy, ri, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  /* Teks di tengah */
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#111827";
  ctx.font = "bold 12px 'DM Sans',sans-serif";
  ctx.fillText("Pengeluaran", cx, cy - 9);
  ctx.fillStyle = "#6b7280";
  ctx.font = "bold 10px 'DM Sans',sans-serif";
  ctx.fillText(fmtRp(total), cx, cy + 9);

  /* Legend */
  document.getElementById("budget-legend").innerHTML = entries
    .map(
      ([label, val], i) => `
    <div class="bl-item">
      <span class="bl-dot" style="background:${
        CHART_COLORS[i % CHART_COLORS.length]
      }"></span>
      <span class="bl-label">${label}</span>
      <span class="bl-pct">${Math.round((val / total) * 100)}%</span>
    </div>`
    )
    .join("");
}

/* ════════════════════════════════════════
   13. FORM KONTAK
════════════════════════════════════════ */
function initKontakForm() {
  const form = document.getElementById("kontak-form");
  const formOk = document.getElementById("form-ok");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateKontak()) return;

    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.innerHTML = `<i class="ri-loader-4-line" aria-hidden="true"></i> Mengirim…`;

    /* Simulasi kirim (ganti dengan fetch ke backend nyata) */
    setTimeout(() => {
      formOk.hidden = false;
      form.reset();
      clearAllErrors();
      btn.disabled = false;
      btn.innerHTML = `<i class="ri-send-plane-2-fill" aria-hidden="true"></i> Kirim Pesan`;
      /* Sembunyikan pesan sukses setelah 6 detik */
      setTimeout(() => {
        formOk.hidden = true;
      }, 6000);
    }, 1500);
  });

  /* Clear error saat user mulai mengetik */
  ["f-nama", "f-email", "f-pesan"].forEach((id) => {
    document
      .getElementById(id)
      ?.addEventListener("input", () => clearError(id));
  });
}

function validateKontak() {
  let valid = true;

  const nama = document.getElementById("f-nama");
  const email = document.getElementById("f-email");
  const pesan = document.getElementById("f-pesan");

  clearAllErrors();

  if (!nama.value.trim()) {
    showError("f-nama", "e-nama", "Nama lengkap wajib diisi.");
    valid = false;
  }
  if (!email.value.trim()) {
    showError("f-email", "e-email", "Alamat email wajib diisi.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError("f-email", "e-email", "Format email tidak valid.");
    valid = false;
  }
  if (!pesan.value.trim()) {
    showError("f-pesan", "e-pesan", "Pesan wajib diisi.");
    valid = false;
  } else if (pesan.value.trim().length < 10) {
    showError("f-pesan", "e-pesan", "Pesan minimal 10 karakter.");
    valid = false;
  }

  /* Focus ke field error pertama */
  if (!valid) {
    const firstErr = document.querySelector(
      ".form-group input.err, .form-group textarea.err"
    );
    firstErr?.focus();
  }
  return valid;
}

function showError(fieldId, errId, msg) {
  const field = document.getElementById(fieldId);
  const errEl = document.getElementById(errId);
  if (field) field.classList.add("err");
  if (errEl) errEl.textContent = msg;
}
function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const errId = "e-" + fieldId.replace("f-", "");
  const errEl = document.getElementById(errId);
  if (field) field.classList.remove("err");
  if (errEl) errEl.textContent = "";
}
function clearAllErrors() {
  ["f-nama", "f-email", "f-pesan"].forEach((id) => clearError(id));
}

/* ════════════════════════════════════════
   14. BACK TO TOP (dipanggil dari initNavbar)
════════════════════════════════════════ */
function initBackTop() {
  /* Sudah di-handle di dalam initNavbar(),
     fungsi ini dibiarkan kosong agar tidak error */
}

/* ════════════════════════════════════════
   15. KEYBOARD GLOBAL
════════════════════════════════════════ */
function initGlobalKeyboard() {
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    /* Tutup lightbox */
    const lb = document.getElementById("lightbox");
    if (lb && !lb.hidden) {
      closeLightbox();
      return;
    }

    /* Tutup modal profil anggota */
    const mm = document.getElementById("member-modal");
    if (mm && !mm.hidden) {
      closeModal(mm);
      return;
    }

    /* Tutup modal upload */
    const um = document.getElementById("upload-modal");
    if (um && !um.hidden) {
      closeModal(um);
      uploadTarget = null;
      pendingPhoto = null;
      return;
    }

    /* Tutup admin login */
    const al = document.getElementById("admin-login-overlay");
    if (al && !al.hidden) {
      closeModal(al);
      return;
    }
  });

  /* Lightbox: navigasi dengan keyboard ← → */
  document.addEventListener("keydown", (e) => {
    const lb = document.getElementById("lightbox");
    if (!lb || lb.hidden) return;
    if (e.key === "ArrowLeft") {
      lbIdx = (lbIdx - 1 + lbList.length) % lbList.length;
      window._lbShowFrame?.();
    }
    if (e.key === "ArrowRight") {
      lbIdx = (lbIdx + 1) % lbList.length;
      window._lbShowFrame?.();
    }
  });
}

/* ════════════════════════════════════════
   16. MODAL HELPER
════════════════════════════════════════ */
function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.hidden = true;
  document.body.style.overflow = "";
}

/* ════════════════════════════════════════
   17. TOAST NOTIFIKASI
════════════════════════════════════════ */
function showToast(msg, type = "info") {
  const old = document.querySelector(".gm-toast");
  if (old) old.remove();

  const colors = {
    success: "#16a34a",
    warn: "#d97706",
    info: "#2563eb",
    error: "#dc2626",
  };
  const icons = {
    success: "ri-checkbox-circle-fill",
    warn: "ri-alert-fill",
    info: "ri-information-fill",
    error: "ri-error-warning-fill",
  };

  const el = document.createElement("div");
  el.className = "gm-toast";
  el.setAttribute("role", "alert");
  el.setAttribute("aria-live", "polite");
  el.style.background = colors[type] || colors.info;
  el.innerHTML = `<i class="${
    icons[type] || icons.info
  }" aria-hidden="true"></i> ${msg}`;
  document.body.appendChild(el);

  /* Auto dismiss */
  setTimeout(() => {
    el.style.transition = "opacity .35s ease";
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 380);
  }, 3200);
}

/* ════════════════════════════════════════
   18. HELPER FUNCTIONS
════════════════════════════════════════ */
function cap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function fmtRp(n) {
  return "Rp " + Number(n || 0).toLocaleString("id-ID");
}

function formatDateID(str) {
  const bulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agt",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const [y, m, d] = str.split("-");
  return `${+d} ${bulan[+m - 1]} ${y}`;
}
