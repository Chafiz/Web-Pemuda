/**
 * GAPURA MUDA – Admin Dashboard Script
 * Fitur: Login, CRUD Anggota/Galeri/Anggaran,
 *        Ekspor CSV & PDF, Backup/Restore JSON,
 *        Grafik, Log Aktivitas
 */

/* ═══════════════════════════════════════════
   1. KONFIGURASI & DATA DEFAULT
═══════════════════════════════════════════ */
const CFG = {
  username: "admin",
  password: "admin123", // ← ganti sebelum deploy
};

const LS = {
  anggota: "gm_anggota",
  galeri: "gm_galeri_items",
  anggaran: "gm_anggaran",
  photos: "gm_member_photos",
  settings: "gm_settings",
  auth: "gm_admin_auth",
  log: "gm_activity_log",
};

/* Data bawaan anggota */
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
];

const DEFAULT_ANGGARAN = {
  2023: [
    {
      id: "a1",
      tanggal: "02 Jan 2024",
      keterangan: "Iuran Anggota Januari",
      kategori: "Iuran",
      tipe: "pemasukan",
      jumlah: 940000,
    },
    {
      id: "a2",
      tanggal: "10 Jan 2024",
      keterangan: "Dana Sosial Banjir",
      kategori: "Sosial",
      tipe: "pengeluaran",
      jumlah: 2500000,
    },
    {
      id: "a3",
      tanggal: "15 Jan 2024",
      keterangan: "Bantuan Desa – Prog. Pemuda",
      kategori: "Dana Desa",
      tipe: "pemasukan",
      jumlah: 5000000,
    },
    {
      id: "a4",
      tanggal: "20 Feb 2024",
      keterangan: "Peralatan Kegiatan Olahraga",
      kategori: "Olahraga",
      tipe: "pengeluaran",
      jumlah: 1800000,
    },
    {
      id: "a5",
      tanggal: "28 Feb 2024",
      keterangan: "Iuran Anggota Feb & Mar",
      kategori: "Iuran",
      tipe: "pemasukan",
      jumlah: 1880000,
    },
    {
      id: "a6",
      tanggal: "10 Mar 2024",
      keterangan: "Konsumsi Turnamen Voli",
      kategori: "Olahraga",
      tipe: "pengeluaran",
      jumlah: 750000,
    },
    {
      id: "a7",
      tanggal: "25 Mar 2024",
      keterangan: "Sponsorship Lokal Turnamen",
      kategori: "Sponsor",
      tipe: "pemasukan",
      jumlah: 2000000,
    },
    {
      id: "a8",
      tanggal: "05 Apr 2024",
      keterangan: "Bibit Tanaman Penghijauan",
      kategori: "Lingkungan",
      tipe: "pengeluaran",
      jumlah: 600000,
    },
    {
      id: "a9",
      tanggal: "17 Agt 2024",
      keterangan: "Dekorasi & Perlengkapan 17-an",
      kategori: "Budaya",
      tipe: "pengeluaran",
      jumlah: 3200000,
    },
    {
      id: "a10",
      tanggal: "15 Okt 2024",
      keterangan: "Bantuan Desa – Semester 2",
      kategori: "Dana Desa",
      tipe: "pemasukan",
      jumlah: 5000000,
    },
    {
      id: "a11",
      tanggal: "10 Okt 2024",
      keterangan: "Logistik Sunatan Massal",
      kategori: "Sosial",
      tipe: "pengeluaran",
      jumlah: 4500000,
    },
    {
      id: "a12",
      tanggal: "15 Nov 2024",
      keterangan: "Sewa Tempat Workshop",
      kategori: "Pendidikan",
      tipe: "pengeluaran",
      jumlah: 800000,
    },
    {
      id: "a13",
      tanggal: "30 Nov 2024",
      keterangan: "Iuran Anggota Okt–Nov",
      kategori: "Iuran",
      tipe: "pemasukan",
      jumlah: 1880000,
    },
    {
      id: "a14",
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

/* ═══════════════════════════════════════════
   2. STATE
═══════════════════════════════════════════ */
let anggotaData = [];
let galeriData = [];
let anggaranData = {}; // { "2024": [...], "2023": [...] }
let memberPhotos = {};
let settings = {
  username: "admin",
  password: "admin123",
  orgName: "KANAL PEMUDA",
  orgDesa: "Pemuda dan Pemudi Dukuh Purwosari",
  orgSlogan: "Bersatu, Berkarya, Berdampak.",
  orgPeriode: "2023–2026",
};
let activityLog = [];
let currentPage = "overview";
let anggotaSort = { key: "nama", dir: 1 };
let confirmCb = null;

/* ═══════════════════════════════════════════
   3. INIT
═══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  loadAll();
  initLogin();
  if (sessionStorage.getItem(LS.auth) === "1") showDashboard();
});

/* ═══════════════════════════════════════════
   4. STORAGE
═══════════════════════════════════════════ */
function loadAll() {
  anggotaData = lsGet(LS.anggota, DEFAULT_ANGGOTA);
  galeriData = lsGet(LS.galeri, DEFAULT_GALERI);
  anggaranData = lsGet(LS.anggaran, DEFAULT_ANGGARAN);
  memberPhotos = lsGet(LS.photos, {});
  settings = lsGet(LS.settings, settings);
  activityLog = lsGet(LS.log, []);
}
function saveAll() {
  lsSet(LS.anggota, anggotaData);
  lsSet(LS.galeri, galeriData);
  lsSet(LS.anggaran, anggaranData);
  lsSet(LS.photos, memberPhotos);
  lsSet(LS.settings, settings);
  lsSet(LS.log, activityLog);
}
function lsGet(key, def) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : def;
  } catch {
    return def;
  }
}
function lsSet(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    toast("Penyimpanan penuh!", "warn");
  }
}

/* ═══════════════════════════════════════════
   5. LOGIN
═══════════════════════════════════════════ */
function initLogin() {
  const loginBtn = document.getElementById("login-btn");
  const userInput = document.getElementById("lp-user");
  const passInput = document.getElementById("lp-pass");
  const errEl = document.getElementById("lp-error");
  const toggleBtn = document.getElementById("toggle-pass");

  toggleBtn.addEventListener("click", () => {
    passInput.type = passInput.type === "password" ? "text" : "password";
    toggleBtn.innerHTML =
      passInput.type === "password"
        ? '<i class="ri-eye-line"></i>'
        : '<i class="ri-eye-off-line"></i>';
  });

  const tryLogin = () => {
    errEl.textContent = "";
    const u = userInput.value.trim();
    const p = passInput.value;
    if (u === settings.username && p === settings.password) {
      sessionStorage.setItem(LS.auth, "1");
      showDashboard();
    } else {
      errEl.textContent = "Username atau kata sandi salah.";
      passInput.value = "";
      passInput.focus();
    }
  };
  loginBtn.addEventListener("click", tryLogin);
  passInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryLogin();
  });
}

function showDashboard() {
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("dashboard").hidden = false;
  document.body.classList.remove("locked");
  initDashboard();
  // Klik di luar sidebar → tutup
  document.addEventListener("click", (e) => {
    const sidebar = document.getElementById("sidebar");
    const toggle = document.getElementById("sidebar-toggle");
    if (
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      sidebar.classList.remove("open");
    }
  });
}

/* ═══════════════════════════════════════════
   6. DASHBOARD SHELL
═══════════════════════════════════════════ */
function initDashboard() {
  // Topbar date
  document.getElementById("topbar-date").textContent =
    new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  // Sidebar nav
  document.querySelectorAll(".sn-item[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => navigateTo(btn.dataset.page));
  });

  // Sidebar toggle (mobile)
  document.getElementById("sidebar-toggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
  });

  // Logout
  document.getElementById("dash-logout").addEventListener("click", () => {
    sessionStorage.removeItem(LS.auth);
    location.reload();
  });

  // Modal close
  document
    .getElementById("dash-modal-close")
    .addEventListener("click", closeModal);
  document.getElementById("dash-modal").addEventListener("click", (e) => {
    if (e.target.id === "dash-modal") closeModal();
  });
  document
    .getElementById("confirm-modal-close")
    .addEventListener("click", closeConfirm);
  document
    .getElementById("confirm-cancel")
    .addEventListener("click", closeConfirm);
  document.getElementById("confirm-ok").addEventListener("click", () => {
    if (confirmCb) confirmCb();
    closeConfirm();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeConfirm();
    }
  });

  navigateTo("overview");
}

function navigateTo(page) {
  currentPage = page;
  document
    .querySelectorAll(".sn-item[data-page]")
    .forEach((b) => b.classList.toggle("active", b.dataset.page === page));
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("page-" + page)?.classList.add("active");

  const titles = {
    overview: "KANAL PEMUDA",
    anggota: "Data Anggota",
    galeri: "Galeri Kegiatan",
    anggaran: "Anggaran",
    pengaturan: "Pengaturan",
  };
  document.getElementById("topbar-title").textContent = titles[page] || page;

  //auto close sidebar di mobile
  document.getElementById("sidebar").classList.remove("open");

  if (page === "overview") renderOverview();
  if (page === "anggota") renderAnggotaPage();
  if (page === "galeri") renderGaleriPage();
  if (page === "anggaran") renderAnggaranPage();
  if (page === "pengaturan") renderPengaturanPage();
}

/* ═══════════════════════════════════════════
   7. OVERVIEW
═══════════════════════════════════════════ */
function renderOverview() {
  // Stat cards
  const allAnggaran = Object.values(anggaranData).flat();
  let inc = 0,
    exp = 0;
  allAnggaran.forEach((d) => {
    if (d.tipe === "pemasukan") inc += d.jumlah;
    else exp += d.jumlah;
  });

  document.getElementById("overview-stats").innerHTML = `
    <div class="stat-card"><div class="stat-card-icon green"><i class="ri-team-line"></i></div><div><div class="stat-card-num">${
      anggotaData.length
    }</div><div class="stat-card-label">Total Anggota</div></div></div>
    <div class="stat-card"><div class="stat-card-icon purple"><i class="ri-gallery-line"></i></div><div><div class="stat-card-num">${
      galeriData.length
    }</div><div class="stat-card-label">Foto Galeri</div></div></div>
    <div class="stat-card"><div class="stat-card-icon yellow"><i class="ri-arrow-down-circle-line"></i></div><div><div class="stat-card-num" style="font-size:1.1rem">${fmtRp(
      inc
    )}</div><div class="stat-card-label">Total Pemasukan</div></div></div>
    <div class="stat-card"><div class="stat-card-icon blue"><i class="ri-wallet-3-line"></i></div><div><div class="stat-card-num" style="font-size:1.1rem">${fmtRp(
      inc - exp
    )}</div><div class="stat-card-label">Saldo Bersih</div></div></div>`;

  // Member composition chart (donut)
  const cats = { pengurus: 0, divisi: 0, anggota: 0 };
  anggotaData.forEach((a) => {
    if (cats[a.kategori] !== undefined) cats[a.kategori]++;
  });
  const catColors = {
    pengurus: "#1a6b3a",
    divisi: "#2563eb",
    anggota: "#7c3aed",
  };
  const catLabels = {
    pengurus: "Pengurus Inti",
    divisi: "Divisi",
    anggota: "Anggota",
  };
  drawDonut("member-chart", Object.entries(cats), Object.values(catColors));
  document.getElementById("member-chart-legend").innerHTML = Object.entries(
    cats
  )
    .map(
      ([k, v]) => `
    <div class="legend-item"><span class="legend-dot" style="background:${catColors[k]}"></span><span>${catLabels[k]}: <strong>${v}</strong></span></div>`
    )
    .join("");

  // Finance bar chart
  drawBars("finance-chart", anggaranData["2024"] || []);

  // Log
  const logEl = document.getElementById("activity-log");
  if (activityLog.length === 0) {
    logEl.innerHTML =
      '<div class="log-item"><i class="ri-information-fill" style="color:#2563eb"></i><span>Belum ada aktivitas tercatat.</span></div>';
  } else {
    logEl.innerHTML = activityLog
      .slice(0, 20)
      .map(
        (l) => `
      <div class="log-item">
        <i class="${l.icon}" style="color:${l.color}"></i>
        <span>${l.text} <span style="color:#9ca3af;font-size:.75rem">${l.time}</span></span>
      </div>`
      )
      .join("");
  }
}

function drawDonut(canvasId, entries, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d"),
    W = canvas.width,
    H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const total = entries.reduce((s, [, v]) => s + v, 0);
  if (!total) return;
  const cx = W / 2,
    cy = H / 2,
    r = Math.min(W, H) / 2 - 16,
    ri = r * 0.54;
  let sa = -Math.PI / 2;
  entries.forEach(([, v], i) => {
    const slice = (v / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, sa, sa + slice);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    sa += slice;
  });
  ctx.beginPath();
  ctx.arc(cx, cy, ri, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.fillStyle = "#1a1a2e";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `bold 12px 'DM Sans',sans-serif`;
  ctx.fillText("Total", cx, cy - 8);
  ctx.font = `bold 16px 'DM Sans',sans-serif`;
  ctx.fillText(total, cx, cy + 10);
}

function drawBars(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d"),
    W = canvas.width,
    H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  // Build monthly totals
  const months = [
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
  const inc = [...Array(12)].map(() => 0),
    exp = [...Array(12)].map(() => 0);
  data.forEach((d) => {
    const m = months.findIndex((m) => d.tanggal.includes(m));
    if (m >= 0) {
      if (d.tipe === "pemasukan") inc[m] += d.jumlah;
      else exp[m] += d.jumlah;
    }
  });
  const maxVal = Math.max(...inc, ...exp) || 1;
  const padL = 8,
    padR = 8,
    padT = 16,
    padB = 28;
  const bW = (W - padL - padR) / 12,
    gap = bW * 0.15,
    bw = (bW - gap * 3) / 2;
  months.forEach((label, i) => {
    const x = padL + i * bW;
    // Income bar
    const ih = (inc[i] / maxVal) * (H - padT - padB);
    ctx.fillStyle = "#1a6b3a";
    ctx.fillRect(x + gap, H - padB - ih, bw, ih);
    // Expense bar
    const eh = (exp[i] / maxVal) * (H - padT - padB);
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(x + gap + bw + gap * 0.5, H - padB - eh, bw, eh);
    // Label
    ctx.fillStyle = "#9ca3af";
    ctx.textAlign = "center";
    ctx.font = "9px 'DM Sans',sans-serif";
    ctx.fillText(label.substring(0, 3), x + bW / 2, H - 4);
  });
  // Legend
  ctx.fillStyle = "#1a6b3a";
  ctx.fillRect(padL, 4, 10, 8);
  ctx.fillStyle = "#1a1a2e";
  ctx.textAlign = "left";
  ctx.font = "10px 'DM Sans',sans-serif";
  ctx.fillText("Pemasukan", padL + 14, 12);
  ctx.fillStyle = "#dc2626";
  ctx.fillRect(padL + 90, 4, 10, 8);
  ctx.fillStyle = "#1a1a2e";
  ctx.fillText("Pengeluaran", padL + 104, 12);
}

/* ═══════════════════════════════════════════
   8. ANGGOTA – CRUD
═══════════════════════════════════════════ */
function renderAnggotaPage() {
  const search = document.getElementById("anggota-search").value.toLowerCase();
  const kat = document.getElementById("anggota-filter-kat").value;

  let list = anggotaData.filter((a) => {
    const matchKat = !kat || a.kategori === kat;
    const matchSearch =
      !search ||
      [a.nama, a.jabatan, a.divisi, a.kontak]
        .join(" ")
        .toLowerCase()
        .includes(search);
    return matchKat && matchSearch;
  });

  // Sort
  list.sort((a, b) => {
    const va = String(a[anggotaSort.key] || "").toLowerCase();
    const vb = String(b[anggotaSort.key] || "").toLowerCase();
    return va < vb ? -anggotaSort.dir : va > vb ? anggotaSort.dir : 0;
  });

  const tbody = document.getElementById("anggota-tbody");
  tbody.innerHTML =
    list
      .map((a) => {
        const photo = memberPhotos[a.id];
        const avatarEl = photo
          ? `<img src="${photo}" class="td-avatar" alt="${a.nama}" />`
          : `<div class="td-avatar-emoji">${a.avatar}</div>`;
        return `
      <tr data-id="${a.id}">
        <td>${avatarEl}</td>
        <td><strong>${a.nama}</strong></td>
        <td>${a.jabatan}</td>
        <td>${a.divisi}</td>
        <td><span class="td-badge badge-${a.kategori}">${cap(
          a.kategori
        )}</span></td>
        <td>${a.usia} thn</td>
        <td><a href="mailto:${
          a.kontak
        }" style="color:var(--clr-primary);font-size:.82rem">${
          a.kontak
        }</a></td>
        <td>
          <div class="td-actions">
            <button class="btn btn-icon edit" data-action="edit-anggota" data-id="${
              a.id
            }" title="Edit"><i class="ri-edit-line"></i></button>
            <button class="btn btn-icon del"  data-action="del-anggota"  data-id="${
              a.id
            }" title="Hapus"><i class="ri-delete-bin-line"></i></button>
          </div>
        </td>
      </tr>`;
      })
      .join("") ||
    `<tr><td colspan="8" style="text-align:center;color:#9ca3af;padding:2rem">Tidak ada data.</td></tr>`;

  document.getElementById(
    "anggota-table-footer"
  ).textContent = `Menampilkan ${list.length} dari ${anggotaData.length} anggota`;

  // Events
  tbody
    .querySelectorAll("[data-action='edit-anggota']")
    .forEach((btn) =>
      btn.addEventListener("click", () => openAnggotaForm(+btn.dataset.id))
    );
  tbody
    .querySelectorAll("[data-action='del-anggota']")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        confirmDelete(`Hapus anggota ini secara permanen?`, () =>
          deleteAnggota(+btn.dataset.id)
        )
      )
    );

  // Sort headers
  document.querySelectorAll("#anggota-table th[data-sort]").forEach((th) => {
    th.addEventListener("click", () => {
      if (anggotaSort.key === th.dataset.sort) anggotaSort.dir *= -1;
      else {
        anggotaSort.key = th.dataset.sort;
        anggotaSort.dir = 1;
      }
      renderAnggotaPage();
    });
  });

  // Toolbar events
  document.getElementById("add-anggota-btn").onclick = () =>
    openAnggotaForm(null);
  document.getElementById("export-anggota-csv").onclick = exportAnggotaCSV;
  document.getElementById("export-anggota-pdf").onclick = exportAnggotaPDF;
  document.getElementById("anggota-search").oninput = renderAnggotaPage;
  document.getElementById("anggota-filter-kat").onchange = renderAnggotaPage;
}

function openAnggotaForm(id) {
  const a = id ? anggotaData.find((x) => x.id === id) : null;
  const title = a ? "Edit Data Anggota" : "Tambah Anggota Baru";

  openModal(
    title,
    `
    <div class="form-row-2">
      <div class="form-group"><label>Nama Lengkap <span>*</span></label><input type="text" id="af-nama" value="${
        a?.nama || ""
      }" /></div>
      <div class="form-group"><label>Jabatan <span>*</span></label><input type="text" id="af-jabatan" value="${
        a?.jabatan || ""
      }" /></div>
    </div>
    <div class="form-row-2">
      <div class="form-group"><label>Divisi <span>*</span></label>
        <select id="af-divisi">
          ${[
            "Pengurus Inti",
            "Divisi Sosial",
            "Divisi Budaya",
            "Divisi Olahraga",
            "Divisi Pendidikan",
          ]
            .map(
              (d) =>
                `<option value="${d}" ${
                  a?.divisi === d ? "selected" : ""
                }>${d}</option>`
            )
            .join("")}
        </select>
      </div>
      <div class="form-group"><label>Kategori <span>*</span></label>
        <select id="af-kategori">
          <option value="pengurus" ${
            a?.kategori === "pengurus" ? "selected" : ""
          }>Pengurus Inti</option>
          <option value="divisi"   ${
            a?.kategori === "divisi" ? "selected" : ""
          }>Divisi</option>
          <option value="anggota"  ${
            a?.kategori === "anggota" ? "selected" : ""
          }>Anggota</option>
        </select>
      </div>
    </div>
    <div class="form-row-2">
      <div class="form-group"><label>Usia</label><input type="number" id="af-usia" value="${
        a?.usia || ""
      }" min="15" max="40" /></div>
      <div class="form-group"><label>Angkatan (Tahun)</label><input type="number" id="af-angkatan" value="${
        a?.angkatan || ""
      }" min="2000" max="2030" /></div>
    </div>
    <div class="form-group"><label>Pendidikan</label><input type="text" id="af-pendidikan" value="${
      a?.pendidikan || ""
    }" /></div>
    <div class="form-group"><label>Minat & Bakat</label><input type="text" id="af-minat" value="${
      a?.minat || ""
    }" /></div>
    <div class="form-group"><label>Prestasi</label><textarea id="af-prestasi" rows="2">${
      a?.prestasi || ""
    }</textarea></div>
    <div class="form-group"><label>Email / Kontak</label><input type="email" id="af-kontak" value="${
      a?.kontak || ""
    }" /></div>
    <div class="form-group"><label>Foto Profil</label>
      <div class="mini-dropzone" id="af-dropzone" tabindex="0" role="button">
        <input type="file" id="af-file" accept="image/*" hidden />
        ${
          id && memberPhotos[id]
            ? `<img src="${memberPhotos[id]}" alt="foto" />`
            : `<i class="ri-user-add-line"></i><span>Klik atau seret foto (opsional)</span>`
        }
      </div>
      ${
        id && memberPhotos[id]
          ? `<button class="btn btn-outline btn-sm" id="af-remove-photo" style="margin-top:.4rem"><i class="ri-delete-bin-line"></i> Hapus Foto</button>`
          : ""
      }
    </div>
    <span class="form-error" id="af-error" role="alert"></span>`,
    [
      { label: "Batal", cls: "btn-outline", action: "cancel" },
      {
        label: a ? "Simpan Perubahan" : "Tambah Anggota",
        cls: "btn-primary",
        action: "save-anggota",
        id: a?.id || null,
      },
    ]
  );

  // Dropzone photo handler
  const dz = document.getElementById("af-dropzone");
  const fi = document.getElementById("af-file");
  dz.addEventListener("click", () => fi.click());
  dz.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") fi.click();
  });
  dz.addEventListener("dragover", (e) => {
    e.preventDefault();
    dz.classList.add("drag-over");
  });
  dz.addEventListener("dragleave", () => dz.classList.remove("drag-over"));
  dz.addEventListener("drop", (e) => {
    e.preventDefault();
    dz.classList.remove("drag-over");
    handleDropzoneFile(e.dataTransfer.files[0], dz, id);
  });
  fi.addEventListener("change", () => {
    if (fi.files[0]) handleDropzoneFile(fi.files[0], dz, id);
  });
  document.getElementById("af-remove-photo")?.addEventListener("click", () => {
    if (id) {
      delete memberPhotos[id];
      lsSet(LS.photos, memberPhotos);
    }
    dz.innerHTML = `<input type="file" id="af-file" accept="image/*" hidden /><i class="ri-user-add-line"></i><span>Klik atau seret foto</span>`;
    const newFi = dz.querySelector("#af-file");
    dz.addEventListener("click", () => newFi.click());
    newFi.addEventListener("change", () => {
      if (newFi.files[0]) handleDropzoneFile(newFi.files[0], dz, id);
    });
    document.getElementById("af-remove-photo")?.remove();
  });

  // Save
  document
    .querySelector("[data-action='save-anggota']")
    .addEventListener("click", () => saveAnggota(a?.id || null));
}

let _pendingPhotoId = null; // member id
let _pendingPhotoURL = null;

function handleDropzoneFile(file, dz, memberId) {
  if (!file || !file.type.startsWith("image/")) {
    toast("File harus gambar.", "warn");
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    toast("Maks. 5 MB.", "warn");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    _pendingPhotoURL = e.target.result;
    _pendingPhotoId = memberId;
    dz.innerHTML = `<img src="${e.target.result}" alt="preview" />`;
  };
  reader.readAsDataURL(file);
}

function saveAnggota(editId) {
  const nama = document.getElementById("af-nama").value.trim();
  const jabatan = document.getElementById("af-jabatan").value.trim();
  const errEl = document.getElementById("af-error");
  if (!nama || !jabatan) {
    errEl.textContent = "Nama dan jabatan wajib diisi.";
    return;
  }
  errEl.textContent = "";

  const obj = {
    id: editId || Math.max(0, ...anggotaData.map((a) => a.id)) + 1,
    nama,
    jabatan,
    divisi: document.getElementById("af-divisi").value,
    kategori: document.getElementById("af-kategori").value,
    usia: +document.getElementById("af-usia").value || 20,
    angkatan:
      +document.getElementById("af-angkatan").value || new Date().getFullYear(),
    pendidikan: document.getElementById("af-pendidikan").value.trim(),
    minat: document.getElementById("af-minat").value.trim(),
    prestasi: document.getElementById("af-prestasi").value.trim(),
    kontak: document.getElementById("af-kontak").value.trim(),
    avatar: editId
      ? anggotaData.find((a) => a.id === editId)?.avatar || "👤"
      : "👤",
  };

  if (_pendingPhotoURL) {
    memberPhotos[obj.id] = _pendingPhotoURL;
    lsSet(LS.photos, memberPhotos);
    _pendingPhotoURL = null;
  }

  if (editId) {
    const idx = anggotaData.findIndex((a) => a.id === editId);
    if (idx >= 0) anggotaData[idx] = obj;
    addLog(`Anggota diubah: ${obj.nama}`, "ri-edit-fill", "#7c3aed");
  } else {
    anggotaData.push(obj);
    addLog(`Anggota ditambah: ${obj.nama}`, "ri-user-add-fill", "#1a6b3a");
  }
  lsSet(LS.anggota, anggotaData);
  closeModal();
  renderAnggotaPage();
  toast(
    editId ? "Data anggota diperbarui ✅" : "Anggota baru ditambahkan ✅",
    "success"
  );
}

function deleteAnggota(id) {
  const a = anggotaData.find((x) => x.id === id);
  anggotaData = anggotaData.filter((x) => x.id !== id);
  delete memberPhotos[id];
  lsSet(LS.anggota, anggotaData);
  lsSet(LS.photos, memberPhotos);
  addLog(`Anggota dihapus: ${a?.nama}`, "ri-delete-bin-fill", "#dc2626");
  renderAnggotaPage();
  toast("Anggota dihapus.", "info");
}

/* ═══════════════════════════════════════════
   9. GALERI – CRUD
═══════════════════════════════════════════ */
function renderGaleriPage() {
  const kat = document.getElementById("galeri-filter-kat").value;
  const list = kat ? galeriData.filter((g) => g.kategori === kat) : galeriData;

  document.getElementById("galeri-tbody").innerHTML =
    list
      .map((g) => {
        const thumb = g.imgSrc
          ? `<img src="${g.imgSrc}" style="width:48px;height:36px;object-fit:cover;border-radius:6px" alt="${g.judul}" />`
          : `<span style="font-size:1.8rem;line-height:1">${g.emoji}</span>`;
        return `
      <tr data-gid="${g.id}">
        <td>${thumb}</td>
        <td><strong>${g.judul}</strong></td>
        <td>${g.tanggal}</td>
        <td><span class="td-badge badge-${g.kategori}">${cap(
          g.kategori
        )}</span></td>
        <td>
          <div class="td-actions">
            <button class="btn btn-icon edit" data-action="edit-galeri" data-id="${
              g.id
            }" title="Edit"><i class="ri-edit-line"></i></button>
            <button class="btn btn-icon del"  data-action="del-galeri"  data-id="${
              g.id
            }" title="Hapus"><i class="ri-delete-bin-line"></i></button>
          </div>
        </td>
      </tr>`;
      })
      .join("") ||
    `<tr><td colspan="5" style="text-align:center;color:#9ca3af;padding:2rem">Tidak ada foto.</td></tr>`;

  document.getElementById(
    "galeri-table-footer"
  ).textContent = `${list.length} dari ${galeriData.length} foto`;

  document
    .querySelectorAll("[data-action='edit-galeri']")
    .forEach((btn) =>
      btn.addEventListener("click", () => openGaleriForm(btn.dataset.id))
    );
  document
    .querySelectorAll("[data-action='del-galeri']")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        confirmDelete("Hapus foto ini dari galeri?", () =>
          deleteGaleri(btn.dataset.id)
        )
      )
    );

  document.getElementById("add-galeri-btn").onclick = () =>
    openGaleriForm(null);
  document.getElementById("export-galeri-csv").onclick = exportGaleriCSV;
  document.getElementById("galeri-filter-kat").onchange = renderGaleriPage;
}

function openGaleriForm(id) {
  const g = id ? galeriData.find((x) => x.id === id) : null;
  openModal(
    g ? "Edit Foto Galeri" : "Tambah Foto Galeri",
    `
    <div class="form-group"><label>Judul Kegiatan <span>*</span></label><input type="text" id="gf-judul" value="${
      g?.judul || ""
    }" /></div>
    <div class="form-row-2">
      <div class="form-group"><label>Tanggal</label><input type="text" id="gf-tanggal" value="${
        g?.tanggal || ""
      }" placeholder="Cth: 15 Jan 2024" /></div>
      <div class="form-group"><label>Kategori</label>
        <select id="gf-kategori">
          ${["sosial", "budaya", "olahraga", "pendidikan"]
            .map(
              (k) =>
                `<option value="${k}" ${
                  g?.kategori === k ? "selected" : ""
                }>${cap(k)}</option>`
            )
            .join("")}
        </select>
      </div>
    </div>
    <div class="form-group"><label>Foto</label>
      <div class="mini-dropzone" id="gf-dropzone" tabindex="0" role="button">
        <input type="file" id="gf-file" accept="image/*" hidden />
        ${
          g?.imgSrc
            ? `<img src="${g.imgSrc}" alt="foto" />`
            : `<i class="ri-image-add-2-line"></i><span>Klik atau seret foto</span>`
        }
      </div>
    </div>
    <span class="form-error" id="gf-error" role="alert"></span>`,
    [
      { label: "Batal", cls: "btn-outline", action: "cancel" },
      {
        label: g ? "Simpan" : "Tambah Foto",
        cls: "btn-primary",
        action: "save-galeri",
        id: g?.id || null,
      },
    ]
  );

  let pendingGaleriImg = null;
  const dz = document.getElementById("gf-dropzone"),
    fi = document.getElementById("gf-file");
  const loadFile = (f) => {
    if (!f || !f.type.startsWith("image/")) {
      toast("File harus gambar.", "warn");
      return;
    }
    new FileReader().onload ||
      (() => {
        const r = new FileReader();
        r.onload = (e) => {
          pendingGaleriImg = e.target.result;
          dz.innerHTML = `<img src="${e.target.result}" alt="preview" />`;
        };
        r.readAsDataURL(f);
      })();
    const r = new FileReader();
    r.onload = (e) => {
      pendingGaleriImg = e.target.result;
      dz.innerHTML = `<img src="${e.target.result}" alt="preview" />`;
    };
    r.readAsDataURL(f);
  };
  dz.addEventListener("click", () => fi.click());
  dz.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") fi.click();
  });
  dz.addEventListener("dragover", (e) => {
    e.preventDefault();
    dz.classList.add("drag-over");
  });
  dz.addEventListener("dragleave", () => dz.classList.remove("drag-over"));
  dz.addEventListener("drop", (e) => {
    e.preventDefault();
    dz.classList.remove("drag-over");
    loadFile(e.dataTransfer.files[0]);
  });
  fi.addEventListener("change", () => {
    if (fi.files[0]) loadFile(fi.files[0]);
  });

  document
    .querySelector("[data-action='save-galeri']")
    .addEventListener("click", () => {
      const judul = document.getElementById("gf-judul").value.trim();
      if (!judul) {
        document.getElementById("gf-error").textContent = "Judul wajib diisi.";
        return;
      }
      const obj = {
        id: id || "u_" + Date.now(),
        judul,
        tanggal: document.getElementById("gf-tanggal").value.trim() || "–",
        kategori: document.getElementById("gf-kategori").value,
        emoji: "🖼️",
        imgSrc: pendingGaleriImg || g?.imgSrc || null,
      };
      if (id) {
        const idx = galeriData.findIndex((x) => x.id === id);
        if (idx >= 0) galeriData[idx] = obj;
        addLog(`Galeri diubah: ${obj.judul}`, "ri-edit-fill", "#7c3aed");
      } else {
        galeriData.unshift(obj);
        addLog(`Foto ditambah: ${obj.judul}`, "ri-image-add-fill", "#1a6b3a");
      }
      lsSet(LS.galeri, galeriData);
      closeModal();
      renderGaleriPage();
      toast(id ? "Foto diperbarui ✅" : "Foto ditambahkan ✅", "success");
    });
}

function deleteGaleri(id) {
  const g = galeriData.find((x) => x.id === id);
  galeriData = galeriData.filter((x) => x.id !== id);
  lsSet(LS.galeri, galeriData);
  addLog(`Foto dihapus: ${g?.judul}`, "ri-delete-bin-fill", "#dc2626");
  renderGaleriPage();
  toast("Foto dihapus.", "info");
}

/* ═══════════════════════════════════════════
   10. ANGGARAN – CRUD
═══════════════════════════════════════════ */
function renderAnggaranPage() {
  const tahun = document.getElementById("anggaran-tahun").value;
  const tipe = document.getElementById("anggaran-tipe").value;

  if (!anggaranData[tahun]) anggaranData[tahun] = [];
  let list = tipe
    ? anggaranData[tahun].filter((d) => d.tipe === tipe)
    : [...anggaranData[tahun]];

  let inc = 0,
    exp = 0;
  anggaranData[tahun].forEach((d) => {
    if (d.tipe === "pemasukan") inc += d.jumlah;
    else exp += d.jumlah;
  });
  document.getElementById("anggaran-strip").innerHTML = `
    <div class="astrip-card income"><i class="ri-arrow-down-circle-fill"></i><div><div class="astrip-label">Pemasukan</div><div class="astrip-amount" style="color:var(--clr-income)">${fmtRp(
      inc
    )}</div></div></div>
    <div class="astrip-card expense"><i class="ri-arrow-up-circle-fill"></i><div><div class="astrip-label">Pengeluaran</div><div class="astrip-amount" style="color:var(--clr-expense)">${fmtRp(
      exp
    )}</div></div></div>
    <div class="astrip-card balance"><i class="ri-wallet-3-fill"></i><div><div class="astrip-label">Saldo</div><div class="astrip-amount" style="color:var(--clr-balance)">${fmtRp(
      inc - exp
    )}</div></div></div>`;

  document.getElementById("anggaran-tbody").innerHTML =
    list
      .map(
        (d) => `
    <tr>
      <td>${d.tanggal}</td>
      <td>${d.keterangan}</td>
      <td>${d.kategori}</td>
      <td><span class="td-badge badge-${d.tipe}">${
          d.tipe === "pemasukan" ? "↓ Masuk" : "↑ Keluar"
        }</span></td>
      <td class="text-right" style="font-weight:700;color:var(--clr-${
        d.tipe === "pemasukan" ? "income" : "expense"
      })">${d.tipe === "pemasukan" ? "+" : "−"}${fmtRp(d.jumlah)}</td>
      <td>
        <div class="td-actions">
          <button class="btn btn-icon edit" data-action="edit-anggaran" data-id="${
            d.id
          }" data-tahun="${tahun}" title="Edit"><i class="ri-edit-line"></i></button>
          <button class="btn btn-icon del"  data-action="del-anggaran"  data-id="${
            d.id
          }" data-tahun="${tahun}" title="Hapus"><i class="ri-delete-bin-line"></i></button>
        </div>
      </td>
    </tr>`
      )
      .join("") ||
    `<tr><td colspan="6" style="text-align:center;color:#9ca3af;padding:2rem">Tidak ada transaksi.</td></tr>`;

  document.getElementById(
    "anggaran-table-footer"
  ).textContent = `${list.length} transaksi ditampilkan`;

  document
    .querySelectorAll("[data-action='edit-anggaran']")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        openAnggaranForm(btn.dataset.id, btn.dataset.tahun)
      )
    );
  document
    .querySelectorAll("[data-action='del-anggaran']")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        confirmDelete("Hapus transaksi ini?", () =>
          deleteAnggaran(btn.dataset.id, btn.dataset.tahun)
        )
      )
    );

  document.getElementById("add-anggaran-btn").onclick = () =>
    openAnggaranForm(null, tahun);
  document.getElementById("export-anggaran-csv").onclick = () =>
    exportAnggaranCSV(tahun);
  document.getElementById("export-anggaran-pdf").onclick = () =>
    exportAnggaranPDF(tahun);
  document.getElementById("anggaran-tahun").onchange = renderAnggaranPage;
  document.getElementById("anggaran-tipe").onchange = renderAnggaranPage;
}

function openAnggaranForm(id, tahun) {
  const list = anggaranData[tahun] || [];
  const d = id ? list.find((x) => x.id === id) : null;
  openModal(
    d ? "Edit Transaksi" : "Tambah Transaksi Baru",
    `
    <div class="form-row-2">
      <div class="form-group"><label>Tanggal <span>*</span></label><input type="text" id="bf-tanggal" value="${
        d?.tanggal || ""
      }" placeholder="Cth: 15 Jan 2024" /></div>
      <div class="form-group"><label>Tipe <span>*</span></label>
        <select id="bf-tipe">
          <option value="pemasukan"   ${
            d?.tipe === "pemasukan" ? "selected" : ""
          }>Pemasukan</option>
          <option value="pengeluaran" ${
            d?.tipe === "pengeluaran" ? "selected" : ""
          }>Pengeluaran</option>
        </select>
      </div>
    </div>
    <div class="form-group"><label>Keterangan <span>*</span></label><input type="text" id="bf-ket" value="${
      d?.keterangan || ""
    }" /></div>
    <div class="form-row-2">
      <div class="form-group"><label>Kategori</label><input type="text" id="bf-kat" value="${
        d?.kategori || ""
      }" placeholder="Iuran, Dana Desa, dll." /></div>
      <div class="form-group"><label>Jumlah (Rp) <span>*</span></label><input type="number" id="bf-jumlah" value="${
        d?.jumlah || ""
      }" min="0" step="1000" /></div>
    </div>
    <span class="form-error" id="bf-error" role="alert"></span>`,
    [
      { label: "Batal", cls: "btn-outline", action: "cancel" },
      {
        label: d ? "Simpan" : "Tambah",
        cls: "btn-primary",
        action: "save-anggaran",
        id: d?.id || null,
        tahun,
      },
    ]
  );
  document
    .querySelector("[data-action='save-anggaran']")
    .addEventListener("click", () => {
      const ket = document.getElementById("bf-ket").value.trim();
      const jumlah = +document.getElementById("bf-jumlah").value;
      const errEl = document.getElementById("bf-error");
      if (!ket || !jumlah) {
        errEl.textContent = "Keterangan dan jumlah wajib diisi.";
        return;
      }
      const obj = {
        id: id || "t_" + Date.now(),
        tanggal: document.getElementById("bf-tanggal").value.trim() || "–",
        keterangan: ket,
        kategori: document.getElementById("bf-kat").value.trim() || "Lainnya",
        tipe: document.getElementById("bf-tipe").value,
        jumlah,
      };
      if (!anggaranData[tahun]) anggaranData[tahun] = [];
      if (id) {
        const idx = anggaranData[tahun].findIndex((x) => x.id === id);
        if (idx >= 0) anggaranData[tahun][idx] = obj;
        addLog(
          `Transaksi diubah: ${obj.keterangan}`,
          "ri-edit-fill",
          "#7c3aed"
        );
      } else {
        anggaranData[tahun].push(obj);
        addLog(
          `Transaksi ditambah: ${obj.keterangan}`,
          "ri-add-circle-fill",
          "#1a6b3a"
        );
      }
      lsSet(LS.anggaran, anggaranData);
      closeModal();
      renderAnggaranPage();
      toast(
        id ? "Transaksi diperbarui ✅" : "Transaksi ditambahkan ✅",
        "success"
      );
    });
}

function deleteAnggaran(id, tahun) {
  const d = anggaranData[tahun]?.find((x) => x.id === id);
  anggaranData[tahun] = anggaranData[tahun]?.filter((x) => x.id !== id);
  lsSet(LS.anggaran, anggaranData);
  addLog(
    `Transaksi dihapus: ${d?.keterangan}`,
    "ri-delete-bin-fill",
    "#dc2626"
  );
  renderAnggaranPage();
  toast("Transaksi dihapus.", "info");
}

/* ═══════════════════════════════════════════
   11. PENGATURAN
═══════════════════════════════════════════ */
function renderPengaturanPage() {
  document.getElementById("set-username").value = settings.username;
  document.getElementById("set-org-name").value = settings.orgName;
  document.getElementById("set-org-desa").value = settings.orgDesa;
  document.getElementById("set-org-slogan").value = settings.orgSlogan;
  document.getElementById("set-org-periode").value = settings.orgPeriode;

  document.getElementById("save-security-btn").onclick = () => {
    const u = document.getElementById("set-username").value.trim();
    const np = document.getElementById("set-pass-new").value;
    const cp = document.getElementById("set-pass-confirm").value;
    const err = document.getElementById("set-pass-error");
    err.textContent = "";
    if (!u) {
      err.textContent = "Username tidak boleh kosong.";
      return;
    }
    if (np && np !== cp) {
      err.textContent = "Kata sandi tidak cocok.";
      return;
    }
    settings.username = u;
    if (np) settings.password = np;
    lsSet(LS.settings, settings);
    toast("Keamanan akun diperbarui ✅", "success");
    addLog("Pengaturan akun diubah", "ri-shield-fill", "#7c3aed");
  };

  document.getElementById("save-org-btn").onclick = () => {
    settings.orgName = document.getElementById("set-org-name").value.trim();
    settings.orgDesa = document.getElementById("set-org-desa").value.trim();
    settings.orgSlogan = document.getElementById("set-org-slogan").value.trim();
    settings.orgPeriode = document
      .getElementById("set-org-periode")
      .value.trim();
    lsSet(LS.settings, settings);
    toast("Info organisasi disimpan ✅", "success");
  };

  document.getElementById("backup-all-btn").onclick = exportBackupJSON;
  document.getElementById("restore-file").onchange = (e) => {
    if (e.target.files[0]) importBackupJSON(e.target.files[0]);
  };
  document.getElementById("reset-all-btn").onclick = () =>
    confirmDelete(
      "PERINGATAN: Semua data akan dihapus dan dikembalikan ke default. Tindakan ini tidak dapat dibatalkan!",
      resetAllData
    );
}

/* ═══════════════════════════════════════════
   12. EKSPOR CSV
═══════════════════════════════════════════ */
function exportAnggotaCSV() {
  const headers = [
    "ID",
    "Nama",
    "Jabatan",
    "Divisi",
    "Kategori",
    "Usia",
    "Angkatan",
    "Pendidikan",
    "Minat",
    "Prestasi",
    "Kontak",
  ];
  const rows = anggotaData.map((a) => [
    a.id,
    a.nama,
    a.jabatan,
    a.divisi,
    a.kategori,
    a.usia,
    a.angkatan,
    a.pendidikan,
    a.minat,
    a.prestasi,
    a.kontak,
  ]);
  downloadCSV("data-anggota.csv", headers, rows);
  addLog("Ekspor CSV anggota", "ri-file-excel-fill", "#16a34a");
  toast("Data anggota diekspor ke CSV ✅", "success");
}

function exportGaleriCSV() {
  const headers = ["ID", "Judul", "Tanggal", "Kategori", "Ada Foto"];
  const rows = galeriData.map((g) => [
    g.id,
    g.judul,
    g.tanggal,
    g.kategori,
    g.imgSrc ? "Ya" : "Tidak",
  ]);
  downloadCSV("data-galeri.csv", headers, rows);
  toast("Data galeri diekspor ke CSV ✅", "success");
}

function exportAnggaranCSV(tahun) {
  const data = anggaranData[tahun] || [];
  const headers = [
    "ID",
    "Tanggal",
    "Keterangan",
    "Kategori",
    "Tipe",
    "Jumlah (Rp)",
  ];
  const rows = data.map((d) => [
    d.id,
    d.tanggal,
    d.keterangan,
    d.kategori,
    d.tipe,
    d.jumlah,
  ]);
  downloadCSV(`anggaran-${tahun}.csv`, headers, rows);
  addLog(`Ekspor CSV anggaran ${tahun}`, "ri-file-excel-fill", "#16a34a");
  toast("Data anggaran diekspor ke CSV ✅", "success");
}

function downloadCSV(filename, headers, rows) {
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [
    headers.map(esc).join(","),
    ...rows.map((r) => r.map(esc).join(",")),
  ].join("\r\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  triggerDownload(URL.createObjectURL(blob), filename);
}

/* ═══════════════════════════════════════════
   13. EKSPOR PDF (pure HTML → print window)
═══════════════════════════════════════════ */
function exportAnggotaPDF() {
  const rows = anggotaData
    .map(
      (a) => `
    <tr>
      <td>${a.nama}</td><td>${a.jabatan}</td><td>${a.divisi}</td>
      <td>${cap(a.kategori)}</td><td>${a.usia}</td><td>${a.kontak}</td>
    </tr>`
    )
    .join("");
  printHTML(`
    <h2>Data Anggota – ${settings.orgName}</h2>
    <p>${settings.orgDesa} · Dicetak: ${new Date().toLocaleDateString(
    "id-ID"
  )}</p>
    <table>
      <thead><tr><th>Nama</th><th>Jabatan</th><th>Divisi</th><th>Kategori</th><th>Usia</th><th>Kontak</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`);
  addLog("Ekspor PDF anggota", "ri-file-pdf-fill", "#dc2626");
  toast("Halaman cetak dibuka ✅", "success");
}

function exportAnggaranPDF(tahun) {
  const data = anggaranData[tahun] || [];
  let inc = 0,
    exp = 0;
  data.forEach((d) => {
    if (d.tipe === "pemasukan") inc += d.jumlah;
    else exp += d.jumlah;
  });
  const rows = data
    .map(
      (d) => `
    <tr>
      <td>${d.tanggal}</td><td>${d.keterangan}</td><td>${d.kategori}</td>
      <td>${d.tipe === "pemasukan" ? "Masuk" : "Keluar"}</td>
      <td style="text-align:right;color:${
        d.tipe === "pemasukan" ? "green" : "red"
      }">${d.tipe === "pemasukan" ? "+" : "−"}${fmtRp(d.jumlah)}</td>
    </tr>`
    )
    .join("");
  printHTML(`
    <h2>Laporan Anggaran ${tahun} – ${settings.orgName}</h2>
    <p>${settings.orgDesa} · Dicetak: ${new Date().toLocaleDateString(
    "id-ID"
  )}</p>
    <div style="display:flex;gap:2rem;margin-bottom:1.5rem">
      <div><strong>Total Pemasukan:</strong> <span style="color:green">${fmtRp(
        inc
      )}</span></div>
      <div><strong>Total Pengeluaran:</strong> <span style="color:red">${fmtRp(
        exp
      )}</span></div>
      <div><strong>Saldo:</strong> <span style="color:blue">${fmtRp(
        inc - exp
      )}</span></div>
    </div>
    <table>
      <thead><tr><th>Tanggal</th><th>Keterangan</th><th>Kategori</th><th>Tipe</th><th>Jumlah</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`);
  addLog(`Ekspor PDF anggaran ${tahun}`, "ri-file-pdf-fill", "#dc2626");
}

function printHTML(content) {
  const w = window.open("", "_blank", "width=900,height=700");
  w.document
    .write(`<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><title>Print</title>
  <style>
    body{font-family:'DM Sans',system-ui,sans-serif;padding:2cm;color:#1a1a2e;font-size:11pt}
    h2{margin-bottom:.2rem} p{color:#888;margin-bottom:1rem}
    table{width:100%;border-collapse:collapse;font-size:10pt}
    th,td{border:1px solid #e4e8ef;padding:6px 10px;text-align:left}
    thead{background:#1a6b3a;color:#fff}
    tr:nth-child(even){background:#f9fafb}
    @media print{body{padding:1cm}}
  </style></head><body>${content}
  <script>setTimeout(()=>window.print(),400)<\/script></body></html>`);
  w.document.close();
}

/* ═══════════════════════════════════════════
   14. BACKUP & RESTORE JSON
═══════════════════════════════════════════ */
function exportBackupJSON() {
  const payload = {
    exportedAt: new Date().toISOString(),
    version: "2.0",
    anggota: anggotaData,
    galeri: galeriData.map((g) => ({ ...g, imgSrc: null })), // skip base64 untuk size
    anggaran: anggaranData,
    settings: { ...settings, password: "(disembunyikan)" },
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  triggerDownload(
    URL.createObjectURL(blob),
    `backup-gapuramuda-${Date.now()}.json`
  );
  addLog("Backup JSON diunduh", "ri-download-cloud-2-fill", "#2563eb");
  toast("Backup JSON berhasil diunduh ✅", "success");
}

function importBackupJSON(file) {
  if (file.type !== "application/json" && !file.name.endsWith(".json")) {
    toast("File harus .json", "warn");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.anggota) {
        anggotaData = data.anggota;
        lsSet(LS.anggota, anggotaData);
      }
      if (data.galeri) {
        galeriData = data.galeri;
        lsSet(LS.galeri, galeriData);
      }
      if (data.anggaran) {
        anggaranData = data.anggaran;
        lsSet(LS.anggaran, anggaranData);
      }
      addLog(
        "Data diimpor dari backup JSON",
        "ri-upload-cloud-2-fill",
        "#7c3aed"
      );
      toast("Data berhasil diimpor dari backup ✅", "success");
      renderOverview();
    } catch {
      toast("File backup tidak valid.", "error");
    }
  };
  reader.readAsText(file);
}

function resetAllData() {
  anggotaData = JSON.parse(JSON.stringify(DEFAULT_ANGGOTA));
  galeriData = JSON.parse(JSON.stringify(DEFAULT_GALERI));
  anggaranData = JSON.parse(JSON.stringify(DEFAULT_ANGGARAN));
  memberPhotos = {};
  [LS.anggota, LS.galeri, LS.anggaran, LS.photos, LS.log].forEach((k) =>
    localStorage.removeItem(k)
  );
  activityLog = [];
  addLog("Semua data direset ke default", "ri-refresh-fill", "#dc2626");
  navigateTo("overview");
  toast("Semua data berhasil direset.", "info");
}

/* ═══════════════════════════════════════════
   15. MODAL UNIVERSAL
═══════════════════════════════════════════ */
function openModal(title, bodyHTML, buttons = []) {
  document.getElementById("dash-modal-title").textContent = title;
  document.getElementById("dash-modal-body").innerHTML = bodyHTML;
  document.getElementById("dash-modal-foot").innerHTML = buttons
    .map(
      (b) =>
        `<button class="btn ${b.cls}" data-action="${b.action}" ${
          b.id ? `data-id="${b.id}"` : ""
        }>${b.label}</button>`
    )
    .join("");
  document
    .querySelectorAll("[data-action='cancel']")
    .forEach((b) => b.addEventListener("click", closeModal));
  document.getElementById("dash-modal").hidden = false;
}
function closeModal() {
  document.getElementById("dash-modal").hidden = true;
}

function confirmDelete(msg, cb) {
  document.getElementById("confirm-msg").textContent = msg;
  confirmCb = cb;
  document.getElementById("confirm-modal").hidden = false;
}
function closeConfirm() {
  document.getElementById("confirm-modal").hidden = true;
  confirmCb = null;
}

/* ═══════════════════════════════════════════
   16. HELPERS
═══════════════════════════════════════════ */
function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function fmtRp(n) {
  return "Rp " + Number(n || 0).toLocaleString("id-ID");
}
function triggerDownload(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function addLog(text, icon = "ri-information-fill", color = "#2563eb") {
  activityLog.unshift({
    text,
    icon,
    color,
    time: new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });
  if (activityLog.length > 50) activityLog.pop();
  lsSet(LS.log, activityLog);
}
function toast(msg, type = "info") {
  const old = document.getElementById("adm-toast");
  if (old) old.remove();
  const colors = {
    success: "#16a34a",
    warn: "#f5a623",
    info: "#2563eb",
    error: "#dc2626",
  };
  const icons = {
    success: "ri-checkbox-circle-fill",
    warn: "ri-alert-fill",
    info: "ri-information-fill",
    error: "ri-error-warning-fill",
  };
  const t = document.createElement("div");
  t.id = "adm-toast";
  t.style.cssText = `position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;background:${colors[type]};color:#fff;padding:.65rem 1.25rem;border-radius:999px;font-size:.85rem;font-weight:600;font-family:var(--ff-body);display:flex;align-items:center;gap:.5rem;box-shadow:0 4px 20px rgba(0,0,0,.2);animation:fadeIn .3s ease;white-space:nowrap;`;
  t.innerHTML = `<i class="${icons[type]}"></i>${msg}`;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.opacity = "0";
    t.style.transition = "opacity .3s";
    setTimeout(() => t.remove(), 300);
  }, 3000);
}
